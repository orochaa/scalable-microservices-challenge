import type { Order } from '@/domain/entities/order'

export abstract class ICreateOrder {
  abstract create(params: ICreateOrder.Params): Promise<Order>
}

export namespace ICreateOrder {
  export interface Params {
    customerId: string
    amount: number
  }
}
