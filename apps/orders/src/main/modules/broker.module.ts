/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IEventPublisher } from '@/services/protocols/broker/event-publisher'
import { EventPublisher } from '@/infra/broker/event-publisher.service'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.BROKER_URL!],
          queue: 'orders',
        },
      },
    ]),
  ],
  providers: [
    {
      provide: IEventPublisher,
      useClass: EventPublisher,
    },
  ],
  exports: [IEventPublisher],
})
export class BrokerModule {}
