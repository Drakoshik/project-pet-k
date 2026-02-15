import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WsService } from './ws.service';

@Module({
  imports: [ConfigModule],
  providers: [WsService],
  exports: [WsService],
})
export class WsModule {}
