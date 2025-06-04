import { ICreateOrder } from '@/domain/usecases/order/create-order'
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
  constructor(readonly createOrder: ICreateOrder) {}

  @Post('orders')
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  async handle(@Body() body: CreateOrderBody): Promise<CreateOrderResponse> {
    const order = await this.createOrder.create({
      customerId: body.customerId,
      amount: body.amount,
    })

    return {
      id: order.id,
      amount: order.amount,
      customerId: order.customerId,
    }
  }
}
