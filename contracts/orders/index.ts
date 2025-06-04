import type { OrderCreatedMessage } from './messages/order-created-message'

export interface OrdersTopics {
  created: OrderCreatedMessage
}
