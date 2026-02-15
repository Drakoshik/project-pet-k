import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class RequestContext {
  static set(key: string, value: any): void {
    const store = asyncLocalStorage.getStore();
    if (!store) {
      throw new Error('Request context not initialized');
    }
    store.set(key, value);
  }

  static get<T>(key: string): T | undefined {
    const store = asyncLocalStorage.getStore();
    return store?.get(key);
  }

  static async run<T>(callback: () => Promise<T>): Promise<T> {
    return asyncLocalStorage.run(new Map(), async () => {
      return await callback();
    });
  }

  static isActive(): boolean {
    return !!asyncLocalStorage.getStore();
  }
}

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    RequestContext.run(async () => {
      next();
    });
  }
}
