import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UniqueConstraint } from '../decorators/unique.decorator';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '.vite'),
      exclude: ['/api*'],
    }),
    PrismaModule,
    AuthModule,
  ],
  providers: [UniqueConstraint],
})
export class AppModule {}
