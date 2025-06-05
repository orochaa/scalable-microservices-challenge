/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { RmqContext } from '@nestjs/microservices'

export function getMessage<T>(context: RmqContext): T {
  const message = context.getMessage() as { content?: Buffer }
  const messageContent = message.content?.toString() || '{}'
  const parsedMessageContent = JSON.parse(messageContent) as {
    data?: unknown
  }

  return parsedMessageContent.data as T
}

export function ackMessage(context: RmqContext): void {
  const channel = context.getChannelRef()
  const message = context.getMessage()

  channel.ack(message)
}
