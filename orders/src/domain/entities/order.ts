import { BadRequestException } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

export class Order {
  private readonly props: Order.Props

  constructor(params: Order.Params) {
    if (!params.id) {
      throw new BadRequestException('id is required')
    }

    if (!params.customerId) {
      throw new BadRequestException('customerId is required')
    }

    if (!params.amount) {
      throw new BadRequestException('amount is required')
    }

    if (params.amount < 0) {
      throw new BadRequestException('amount must be greater than or equal to 0')
    }

    this.props = {
      id: params.id,
      customerId: params.customerId,
      amount: params.amount,
    }
  }

  get id(): string {
    return this.props.id
  }

  get customerId(): string {
    return this.props.customerId
  }

  get amount(): number {
    return this.props.amount
  }

  static create(params: Order.CreateParams): Order {
    return new Order({
      id: randomUUID(),
      customerId: params.customerId,
      amount: params.amount,
    })
  }
}

export namespace Order {
  export interface Props {
    id: string
    customerId: string
    amount: number
  }

  export interface Params {
    id: string
    customerId: string
    amount: number
  }

  export interface CreateParams {
    customerId: string
    amount: number
  }
}
