import { Module } from '@nestjs/common';

import { UniqueConstraint } from '../decorators/unique.decorator';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UniqueConstraint],
})
export class AppModule {}
