import { Module } from '@nestjs/common';
import { NoroService } from './noro.service';
import { NoroController } from './noro.controller';
import { DatabaseModule } from '../../configs/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [NoroService],
  controllers: [NoroController],
})
export class NoroModule {}
