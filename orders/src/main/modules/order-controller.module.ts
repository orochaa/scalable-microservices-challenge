import { ICreateOrder } from '@/domain/usecases/order/create-order'
import { CreateOrderController } from '@/presentation/controllers/create-order.controller'
import { CreateOrderService } from '@/services/usecases/order/create-order.service'
import { BrokerModule } from '@/main/modules/broker.module'
import { OrderRepositoryModule } from '@/main/modules/order-repository.module'
import { TracerModule } from '@/main/modules/tracer.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [OrderRepositoryModule, BrokerModule, TracerModule],
  controllers: [CreateOrderController],
  providers: [
    {
      provide: ICreateOrder,
      useClass: CreateOrderService,
    },
  ],
})
export class OrderControllerModule {}
