import type { ServiceTopics } from '@workspace/contracts'

export abstract class IEventPublisher {
  abstract publish<TTopic extends keyof IEventPublisher.Topics>(
    topic: TTopic,
    data: IEventPublisher.Topics[TTopic],
  ): Promise<void>
}

export namespace IEventPublisher {
  export type Topics = ServiceTopics<'orders'>
}
