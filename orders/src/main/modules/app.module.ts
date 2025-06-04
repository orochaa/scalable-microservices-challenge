import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from './http.module'

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
})
export class AppModule {}
