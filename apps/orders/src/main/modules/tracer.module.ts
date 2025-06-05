import { ITracer } from '@/services/protocols/tracer/tracer'
import { OpenTelemetryTracer } from '@/infra/tracer/tracer.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    {
      provide: ITracer,
      useClass: OpenTelemetryTracer,
    },
  ],
  exports: [ITracer],
})
export class TracerModule {}
