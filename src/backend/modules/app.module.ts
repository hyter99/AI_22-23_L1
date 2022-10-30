import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ExistsConstraint } from '../decorators/exists.decorator';

import { UniqueConstraint } from '../decorators/unique.decorator';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { OfferModule } from './offer/offer.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '.vite'),
      exclude: ['/api*'],
    }),
    PrismaModule,
    AuthModule,
    OfferModule,
    StockModule,
  ],
  providers: [UniqueConstraint, ExistsConstraint],
})
export class AppModule {}
