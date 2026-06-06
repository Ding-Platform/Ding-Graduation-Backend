import { Module, forwardRef } from '@nestjs/common';
import { NoroService } from './noro.service';
import { NoroController } from './noro.controller';
import { DatabaseModule } from '../../configs/database/database.module';
import { InterestModule } from '../interest/interest.module';

@Module({
  imports: [DatabaseModule, InterestModule],
  providers: [NoroService],
  controllers: [NoroController],
  exports: [NoroService],
})
export class NoroModule {}
