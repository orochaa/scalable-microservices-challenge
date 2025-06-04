import { HealthCheckController } from '@/presentation/controllers/health-check.controller'
import { OrderControllerModule } from '@/main/modules/order-controller.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [OrderControllerModule],
  controllers: [HealthCheckController],
})
export class HttpModule {}
