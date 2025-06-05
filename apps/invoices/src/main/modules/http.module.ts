import { HealthCheckController } from '@/presentation/controllers/health-check.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [HealthCheckController],
})
export class HttpModule {}
