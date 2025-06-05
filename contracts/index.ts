export type TopicPair<TService, TTopic> = TService extends string
  ? TTopic extends string
    ? `${TService}.${TTopic}`
    : never
  : never

export type Topics<
  TService extends string,
  TTopics extends Record<string, unknown>,
> = {
  [K in keyof TTopics as TopicPair<TService, K>]: TTopics[K]
}
