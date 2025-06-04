import { ICreateOrderRepository } from '@/services/protocols/database/order-repository'
import { OrderRepository } from '@/infra/database/order.repository'
import { PrismaModule } from '@/main/modules/prisma.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaModule],
  providers: [
    OrderRepository,
    {
      provide: ICreateOrderRepository,
      useExisting: OrderRepository,
    },
  ],
  exports: [ICreateOrderRepository],
})
export class OrderRepositoryModule {}
