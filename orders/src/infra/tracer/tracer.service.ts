import { SpanStatusCode, context, trace } from '@opentelemetry/api'
import type { AttributeValue, Span, Tracer } from '@opentelemetry/api'
import type { ITracer } from '@/services/protocols/tracer/tracer'
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

@Injectable()
export class OpenTelemetryTracer implements ITracer {
  readonly tracer: Tracer

  constructor() {
    if (!process.env.OTEL_SERVICE_NAME) {
      throw new Error(`OTEL_SERVICE_NAME environment variable is not defined`)
    }
    this.tracer = trace.getTracer(process.env.OTEL_SERVICE_NAME)
  }

  async startSpan<T>({
    name,
    fn,
    attributes,
  }: ITracer.StartSpanParams<T>): Promise<T> {
    const span = this.tracer.startSpan(name)
    const ctx = trace.setSpan(context.active(), span)

    try {
      const traceId =
        trace.getActiveSpan()?.spanContext().traceId ?? randomUUID()
      span.setAttribute('traceId', traceId)

      for (const [key, value] of Object.entries(attributes)) {
        span.setAttribute(key, value as AttributeValue)
      }

      const result = await context.with(ctx, async () =>
        fn(new OpenTelemetryActiveSpan(span)),
      )
      span.setStatus({ code: SpanStatusCode.OK })

      return result
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR })
      span.recordException(error as Error)

      throw error
    } finally {
      span.end()
    }
  }
}

class OpenTelemetryActiveSpan implements ITracer.ActiveSpan {
  constructor(private readonly span: Span) {}

  setAttribute(key: string, value: unknown): void {
    this.span.setAttribute(key, value as AttributeValue)
  }

  setError(error: Error): void {
    this.span.setStatus({ code: SpanStatusCode.ERROR })
    this.span.recordException(error)
  }

  end(): void {
    this.span.end()
  }
}
