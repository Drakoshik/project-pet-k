import { Module } from '@nestjs/common';
import { MessagesPrismaRepository } from './messages.prisma.repository';
import { MessagesRepository } from './messages.repository';

@Module({
  providers: [
    MessagesPrismaRepository,
    {
      provide: MessagesRepository,
      useClass: MessagesPrismaRepository,
    },
  ],
  exports: [MessagesRepository],
})
export class MessageRepositoryModule {}
