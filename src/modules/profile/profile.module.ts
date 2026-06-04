import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CloudinaryModule } from '../../common/services/cloudinary/cloudinary.module';
import { SocialModule } from '../social/social.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [CloudinaryModule, SocialModule, NotificationModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
