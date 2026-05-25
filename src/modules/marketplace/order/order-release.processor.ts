import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { OrderService } from './order.service';

@Processor('order-release')
export class OrderReleaseProcessor {
  constructor(private readonly orderService: OrderService) {}

  @Process('release-funds')
  async handleReleaseFunds(job: Job<{ orderId: string }>) {
    const { orderId } = job.data;
    if (!orderId) {
      return { skipped: true, reason: 'Missing orderId' };
    }

    return this.orderService.releaseFundsFromJob(orderId);
  }
}
