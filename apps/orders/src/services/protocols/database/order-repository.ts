import type { Order } from '@/domain/entities/order'

export abstract class ICreateOrderRepository {
  abstract create(data: Order): Promise<void>
}
