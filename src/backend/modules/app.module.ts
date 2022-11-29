import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ExistsConstraint } from '../decorators/exists.decorator';

import { appConfigSchema } from '../schemas/app.config.schema'

import { UniqueConstraint } from '../decorators/unique.decorator';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { OfferModule } from './offer/offer.module';
import { ProfileModule } from './profile/profile.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from "@nestjs/config";
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '.vite'),
      exclude: ['/api*'],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    OfferModule,
    CompanyModule,
    ProfileModule,
    ConfigModule.forRoot({
      validate: appConfigSchema.parse,
    }),
  ],
  providers: [UniqueConstraint, ExistsConstraint, TransactionService],
})
export class AppModule { }
