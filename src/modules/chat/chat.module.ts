import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ContextModule } from 'src/common/application/context/context.module';

@Module({
  imports: [
    JwtModule.register({}), // Uses global JWT config from AuthModule
    ContextModule, // Provides IContextAuthService
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
