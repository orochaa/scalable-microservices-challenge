export abstract class IEventPublisher {
  abstract publish<TTopic extends keyof IEventPublisher.Topics>(
    topic: TTopic,
    data: IEventPublisher.Topics[TTopic],
  ): Promise<void>
}

export namespace IEventPublisher {
  export interface Topics {
    [K: `orders.${string}`]: unknown

    'orders.created': {
      orderId: string
      amount: number
      customer: {
        id: string
      }
    }
  }
}
