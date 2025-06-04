import type { Order } from '@/domain/entities/order'
import type { ICreateOrderRepository } from '@/services/protocols/database/order-repository'
import { PrismaService } from '@/infra/database/prisma.service'
import { Injectable } from '@nestjs/common'

interface IOrderRepository extends ICreateOrderRepository {}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(readonly db: PrismaService) {}

  async create(data: Order): Promise<void> {
    await this.db.order.create({
      data: {
        id: data.id,
        customerId: data.customerId,
        amount: data.amount,
      },
    })
  }
}
