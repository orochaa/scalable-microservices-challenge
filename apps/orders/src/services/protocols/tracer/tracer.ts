export abstract class ITracer {
  abstract startSpan<T>(params: ITracer.StartSpanParams<T>): Promise<T>
}

export namespace ITracer {
  export interface ActiveSpan {
    setAttribute(key: string, value: unknown): void
    setError(error: Error): void
    end(): void
  }

  export interface StartSpanParams<TResult> {
    name: string
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    fn: (span: ActiveSpan) => Promise<TResult>
    attributes: Record<string, unknown>
  }
}
