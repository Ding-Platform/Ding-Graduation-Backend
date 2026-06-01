import { Module, Global } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';

@Global()
@Module({
  controllers: [InterestController],
  providers: [InterestService],
  exports: [InterestService],
})
export class InterestModule {}
