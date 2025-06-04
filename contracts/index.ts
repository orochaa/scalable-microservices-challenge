import type { OrdersTopics } from './orders'

interface NestedTopics {
  orders: OrdersTopics
}

type TopicPair<TService, TTopic> = TService extends string
  ? TTopic extends string
    ? `${TService}.${TTopic}`
    : never
  : never

export type Topics = {
  [K in keyof NestedTopics]: {
    [SK in keyof NestedTopics[K] as TopicPair<K, SK>]: NestedTopics[K][SK]
  }
}[keyof NestedTopics]

export type ServiceTopics<TService extends string> = {
  [K in keyof Topics as K extends TopicPair<TService, string>
    ? K
    : never]: Topics[K]
}

type T = ServiceTopics<'orders'>
