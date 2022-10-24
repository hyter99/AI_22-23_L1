import { Global, Module } from '@nestjs/common';
import { UniqueConstraint } from '../decorators/unique.decorator';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UniqueConstraint],
export class AppModule {}
