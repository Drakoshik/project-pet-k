import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { AuthUtilsModule } from './utils/auth/auth-utils.module';
import { WsModule } from './api/websocket/ws.module';
import { ContextMiddleware } from './utils/request-context';
import { UserRepositoryModule } from './repositories/users/users.repository.module';
import { CardRepositoryModule } from './repositories/Cards/cards.repository.module';
import { ListRepositoryModule } from './repositories/Lists/lists.repository.module';
import { MessageRepositoryModule } from './repositories/Messages/messages.repository.module';
import { ProjectMemberRepositoryModule } from './repositories/ProjectMembers/projectMembers.repository.module';
import { ProjectRepositoryModule } from './repositories/Projects/projects.repository.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    AuthUtilsModule,
    WsModule,
    UserRepositoryModule,
    CardRepositoryModule,
    ListRepositoryModule,
    MessageRepositoryModule,
    ProjectMemberRepositoryModule,
    ProjectRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
