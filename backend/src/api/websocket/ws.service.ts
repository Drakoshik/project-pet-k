import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { WebSocketServer, WebSocket, RawData } from 'ws';
import { parse } from 'node:url';
import { IncomingMessage } from 'http';
import { ConfigService } from '@nestjs/config';

import { createWsRouting, WsMessage } from './ws.routing';
import { AuthUtilsService } from '../../utils/auth/auth-utils.service';
import { RequestContext } from '../../utils/request-context';

interface WsConfig {
  port: number;
  path: string;
  pingInterval: number;
}

@Injectable()
export class WsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(WsService.name);
  private wss: WebSocketServer;
  private connectionsPool = new Map<number, WebSocket>();
  private config: WsConfig;
  private routing: ReturnType<typeof createWsRouting>;

  constructor(
    private readonly configService: ConfigService,
    private readonly authUtilsService: AuthUtilsService,
  ) {
    this.config = {
      port: this.configService.get<number>('WS_PORT', 8080),
      path: this.configService.get<string>('WS_PATH', '/ws'),
      pingInterval: this.configService.get<number>('WS_PING_INTERVAL', 30000),
    };

    this.routing = createWsRouting(this.logger);
  }

  async onModuleInit() {
    this.wss = new WebSocketServer({
      port: this.config.port,
      path: this.config.path,
    });

    this.setupEventHandlers();
    this.logger.log(`WS server started on port ${this.config.port}`);
  }

  async onModuleDestroy() {
    await this.shutdown();
  }

  private setupEventHandlers() {
    this.wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
      const userId = this.authenticate(ws, req);
      if (!userId) return;

      this.connectionsPool.set(userId, ws);
      this.logger.log(`User ${userId} connected`);

      const pingInterval = this.setupPing(ws, userId);
      this.setupMessageHandler(ws, req, userId);
      this.setupCloseHandler(ws, userId, pingInterval);
    });

    this.wss.on('error', (error) => {
      this.logger.error('WebSocket server error:', error);
    });
  }

  private authenticate(ws: WebSocket, req: IncomingMessage): number | null {
    try {
      const { query } = parse(req.url || '', true);
      const token = query.token as string;
      if (!token) throw new Error('No token provided');

      const payload = this.authUtilsService.validateToken(token);
      return payload.userId;
    } catch (error) {
      this.logger.warn(`Authentication failed: ${error.message}`);
      ws.close(1008, 'Authentication failed');
      return null;
    }
  }

  private setupPing(ws: WebSocket, userId: number): NodeJS.Timeout {
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      }
    }, this.config.pingInterval);

    ws.on('pong', () => {
      this.logger.debug(`Pong from user ${userId}`);
    });

    return pingInterval;
  }

  private setupMessageHandler(
    ws: WebSocket,
    req: IncomingMessage,
    userId: number,
  ) {
    ws.on('message', (data: RawData) => {
      RequestContext.run(async () => {
        try {
          RequestContext.set('userId', userId);
          await this.handleMessage(ws, data, userId);
        } catch (error) {
          this.logger.error(`Error processing message from ${userId}:`, error);
          ws.send(JSON.stringify({ error: 'Processing failed' }));
        }
      });
    });
  }

  private async handleMessage(ws: WebSocket, data: RawData, userId: number) {
    const message = this.parseMessage(data);
    if (!message) {
      ws.close(1008, 'Invalid message format');
      return;
    }

    const handler = this.routing[message.action];
    if (!handler) {
      ws.close(1008, `Unsupported action: ${message.action}`);
      return;
    }

    await handler(ws, message.data, {
      userId,
      logger: this.logger,
      timestamp: Date.now(),
    });
  }

  private parseMessage(data: RawData): WsMessage | null {
    try {
      return JSON.parse(data.toString()) as WsMessage;
    } catch (error) {
      this.logger.error('Message parsing failed:', error);
      return null;
    }
  }

  private setupCloseHandler(
    ws: WebSocket,
    userId: number,
    pingInterval: NodeJS.Timeout,
  ) {
    ws.on('close', () => {
      clearInterval(pingInterval);
      this.connectionsPool.delete(userId);
      this.logger.log(`User ${userId} disconnected`);
    });

    ws.on('error', (error) => {
      this.logger.error(`Connection error for user ${userId}:`, error);
      ws.close();
    });
  }

  public sendToUser(userId: number, message: unknown): boolean {
    const ws = this.connectionsPool.get(userId);
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;

    try {
      ws.send(JSON.stringify(message));
      return true;
    } catch (error) {
      this.logger.error(`Failed to send to user ${userId}:`, error);
      return false;
    }
  }

  public sendToManyUsers(userIds: number[], data: any, skipInvalid = true) {
    if (!userIds || userIds.length === 0) return;

    let jsonData: string;
    try {
      jsonData = JSON.stringify(data);
    } catch (error) {
      console.error('Failed to stringify data:', error);
      return;
    }

    const failedSends: number[] = [];

    userIds.forEach((userId) => {
      const ws = this.connectionsPool.get(userId);
      if (ws) {
        try {
          if (ws.readyState === ws.OPEN) {
            ws.send(jsonData);
          } else {
            throw new Error('Connection not open');
          }
        } catch (error) {
          console.error(`Error sending to user ${userId}:`, error);
          failedSends.push(userId);
        }
      } else if (!skipInvalid) {
        console.warn(`No connection found for user ${userId}`);
      }
    });

    if (failedSends.length > 0) {
      failedSends.forEach((userId) => this.connectionsPool.delete(userId));
    }
  }

  public broadcast(message: unknown, excludeUserIds: number[] = []): void {
    const payload = JSON.stringify(message);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  public getConnectedUsers(): number[] {
    return Array.from(this.connectionsPool.keys());
  }

  public async shutdown(): Promise<void> {
    return new Promise((resolve) => {
      Array.from(this.connectionsPool.values()).forEach((ws) => ws.close());
      this.connectionsPool.clear();

      this.wss.close(() => {
        this.logger.log('WebSocket server stopped');
        resolve();
      });
    });
  }
}
