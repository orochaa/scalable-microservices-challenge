import {
  ackMessage,
  getMessage,
} from '@/presentation/controllers/utils/rmq-message'
import { Controller } from '@nestjs/common'
import { Ctx, EventPattern } from '@nestjs/microservices'
import type { RmqContext } from '@nestjs/microservices'
import type {
  OrderCreatedMessage,
  OrderTopicsName,
} from '@workspace/contracts/orders'

@Controller()
export class CreateInvoiceController {
  @EventPattern<OrderTopicsName>('orders.created')
  handle(@Ctx() context: RmqContext): void {
    const data = getMessage<OrderCreatedMessage>(context)
    console.log(data)

    ackMessage(context)
  }
}
