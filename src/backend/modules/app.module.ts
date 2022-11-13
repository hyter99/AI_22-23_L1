import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ExistsConstraint } from '../decorators/exists.decorator';

import { appConfigSchema } from '../schemas/app.config.schema'

import { UniqueConstraint } from '../decorators/unique.decorator';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { OfferModule } from './offer/offer.module';
import { ProfileModule } from './profile/profile.module';
import { StockModule } from './stock/stock.module';
import { ConfigModule } from "@nestjs/config";

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
    ProfileModule,
    ConfigModule.forRoot({
      validate: appConfigSchema.parse,
    }),
  ],
  providers: [UniqueConstraint, ExistsConstraint],
})
export class AppModule {}
