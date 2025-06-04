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
          urls: ['amqp://localhost:5672'],
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
