import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  register(registerDto: RegisterDto) {
    const salt = genSaltSync();
    const hashedPassword = hashSync(registerDto.password, salt);

    return this.prisma.user.create({
      data: {
        name: registerDto.login,
        email: registerDto.email,
        password: hashedPassword,
        salt,
      },
    });
  }
}
