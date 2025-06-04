import { Order } from '@/domain/entities/order'
import type { ICreateOrder } from '@/domain/usecases/order/create-order'
import { IEventPublisher } from '@/services/protocols/broker/event-publisher'
import { ICreateOrderRepository } from '@/services/protocols/database/order-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateOrderService implements ICreateOrder {
  constructor(
    readonly createOrderRepository: ICreateOrderRepository,
    readonly eventPublisher: IEventPublisher,
  ) {}

  async create(params: ICreateOrder.Params): Promise<Order> {
    const order = Order.create({
      customerId: params.customerId,
      amount: params.amount,
    })

    await this.createOrderRepository.create(order)
    await this.eventPublisher.publish('orders.created', {
      orderId: order.id,
      amount: order.amount,
      customer: {
        id: order.customerId,
      },
    })

    return order
  }
}
