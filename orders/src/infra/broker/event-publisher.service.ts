import type { IEventPublisher } from '@/services/protocols/broker/event-publisher'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class EventPublisher implements IEventPublisher {
  constructor(@Inject('RABBITMQ_CLIENT') readonly client: ClientProxy) {}

  async publish(topic: string, data: unknown): Promise<void> {
    await firstValueFrom(this.client.emit(topic, data))
  }
}
