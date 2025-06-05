import '@opentelemetry/auto-instrumentations-node/register'
import { AppModule } from '@/main/modules/app.module'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import type { ValidationError } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionsFilter } from './http-exceptions.filter'

if (!process.env.APP_PORT) {
  throw new Error('APP_PORT environment variable is not defined')
}

const APP_PORT = Number(process.env.APP_PORT)

function isDevMode(): boolean {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

function mapError(
  errorResponse: Record<string, unknown>,
  error: ValidationError,
): void {
  if (error.children?.length) {
    errorResponse[error.property] ??= {}
    const nestedErrorResponse = errorResponse[error.property]

    for (const childError of error.children) {
      mapError(nestedErrorResponse as Record<string, unknown>, childError)
    }

    return
  }

  if (error.constraints) {
    errorResponse[error.property] = Object.values(error.constraints)[0]

    return
  }

  // eslint-disable-next-line no-console
  console.warn(`MapValidationError: ${JSON.stringify(error, null, 2)}`)
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: (
      requestOrigin: string,
      cb: (err: Error | null, origin?: string) => void,
    ) => {
      if (!requestOrigin || requestOrigin === process.env.FRONT_HOST) {
        cb(null, requestOrigin)
      } else {
        cb(new Error(`Invalid origin access: ${requestOrigin}`))
      }
    },
  })

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new HttpExceptionsFilter(httpAdapter))

  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      stopAtFirstError: true,
      exceptionFactory(errors: ValidationError[]): never {
        const errorResponse: Record<string, unknown> = {}

        for (const error of errors) {
          mapError(errorResponse, error)
        }

        throw new BadRequestException({
          message: errorResponse,
          error: 'BadRequest',
          statusCode: 400,
        })
      },
    }),
  )

  if (isDevMode()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().addBearerAuth().setTitle('orders').build(),
    )
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(APP_PORT)
}

bootstrap()
  .then(() => {
    process.stdout.write(
      `🚀 Server is running on http://localhost:${APP_PORT}\n`,
    )

    if (isDevMode()) {
      process.stdout.write(
        `📚 Swagger is running on http://localhost:${APP_PORT}/docs\n`,
      )
    }
  })
  .catch(error => {
    console.error(error)
  })
