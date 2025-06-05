import { ICreateOrder } from '@/domain/usecases/order/create-order'
import { ITracer } from '@/services/protocols/tracer/tracer'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { IsInt, IsUUID, Min } from 'class-validator'

class CreateOrderBody {
  @ApiProperty()
  @IsUUID()
  customerId: string

  @ApiProperty()
  @Min(0)
  @IsInt()
  amount: number
}

class CreateOrderResponse {
  @ApiProperty()
  id: string

  @ApiProperty()
  customerId: string

  @ApiProperty()
  amount: number
}

@ApiTags('order')
@Controller()
export class CreateOrderController {
  constructor(
    readonly createOrder: ICreateOrder,
    readonly tracer: ITracer,
  ) {}

  @Post('orders')
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: CreateOrderResponse })
  async handle(@Body() body: CreateOrderBody): Promise<CreateOrderResponse> {
    const order = await this.tracer.startSpan({
      name: 'CreateOrderService.create',
      fn: async () =>
        this.createOrder.create({
          customerId: body.customerId,
          amount: body.amount,
        }),
      attributes: {
        customerId: body.customerId,
        amount: body.amount,
      },
    })

    return {
      id: order.id,
      amount: order.amount,
      customerId: order.customerId,
    }
  }
}
