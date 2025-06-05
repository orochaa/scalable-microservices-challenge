import { CreateInvoiceController } from '@/presentation/controllers/create-invoice.controller'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from './http.module'

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [CreateInvoiceController],
})
export class AppModule {}
