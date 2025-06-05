import { Topics } from './index'

export interface OrderCreatedMessage {
  orderId: string
  amount: number
  customer: {
    id: string
  }
}

export type OrderTopics = Topics<
  'orders',
  {
    created: OrderCreatedMessage
  }
>

export type OrderTopicsName = keyof OrderTopics
