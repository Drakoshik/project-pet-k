import { WebSocket } from 'ws';
import { Logger } from '@nestjs/common';

export enum WsActions {
  PING = 'ping',
  JOIN = 'join',
  CREATE = 'create',
  MESSAGE = 'message',
}

export interface WsMessage<T = unknown> {
  action: WsActions;
  data: T;
}

export interface WsContext {
  userId: number;
  logger: Logger;
  timestamp: number;
}

export type WsHandler<T = unknown> = (
  ws: WebSocket,
  data: T,
  context: WsContext,
) => Promise<void> | void;

export const createWsRouting = (
  logger: Logger,
): Record<WsActions, WsHandler> => ({
  [WsActions.PING]: async (ws) => {
    ws.pong();
    logger.debug(`Ping received`);
  },

  [WsActions.JOIN]: async (ws, data, ctx) => {
    ctx.logger.log(`User ${ctx.userId} joined`);
    ws.send(
      JSON.stringify({
        event: 'welcome',
        userId: ctx.userId,
        timestamp: ctx.timestamp,
      }),
    );
  },

  [WsActions.CREATE]: async (ws, data, ctx) => {
    ctx.logger.log(`User ${ctx.userId} created`, { data });
    ws.send(
      JSON.stringify({
        event: 'created',
        data,
        timestamp: ctx.timestamp,
      }),
    );
  },

  [WsActions.MESSAGE]: async (ws, data: { text: string }, ctx) => {
    ctx.logger.log(`Message from ${ctx.userId}: ${data.text}`);
    ws.send(
      JSON.stringify({
        event: 'message_received',
        text: data.text,
        timestamp: ctx.timestamp,
      }),
    );
  },
});
