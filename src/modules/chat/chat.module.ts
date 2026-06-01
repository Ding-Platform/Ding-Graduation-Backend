import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import {
  MessageService,
  RoomService,
  ReactionService,
  ReadReceiptService,
  ChatMediaService,
} from './services';
import { ContextModule } from 'src/common/application/context/context.module';
import { CloudinaryModule } from 'src/common/services/cloudinary/cloudinary.module';
import { RoomMemberGuard } from 'src/common/guards/room-member.guard';
import { RoomAdminGuard } from 'src/common/guards/room-admin.guard';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    AuditModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    ContextModule, // Provides IContextAuthService
    CloudinaryModule, // For media uploads
  ],
  controllers: [ChatController],
  providers: [
    // Services
    MessageService,
    RoomService,
    ReactionService,
    ReadReceiptService,
    ChatMediaService,
    // Gateway
    ChatGateway,
    // Guards
    RoomMemberGuard,
    RoomAdminGuard,
  ],
  exports: [
    ChatGateway,
    MessageService,
    RoomService,
    ReactionService,
    ReadReceiptService,
    ChatMediaService,
  ],
})
export class ChatModule {}
