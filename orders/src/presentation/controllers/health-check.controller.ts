import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger'

class HealthCheckResponse {
  @ApiProperty()
  status: string
}

@ApiTags('health')
@Controller()
export class HealthCheckController {
  @Get('/health')
  @ApiOkResponse()
  handle(): HealthCheckResponse {
    return { status: 'ok' }
  }
}
