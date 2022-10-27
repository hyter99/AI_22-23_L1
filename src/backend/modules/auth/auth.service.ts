import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';

import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly JwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const salt = await genSalt();
    const hashedPassword = await hash(registerDto.password, salt);

    return this.prisma.user.create({
      data: {
        name: registerDto.name,
        surname: registerDto.surname,
        email: registerDto.email,
        password: hashedPassword,
        passwordSalt: salt,
        balanceCents: 0,
      },
      select: {
        userId: true,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const userbyEmail = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (userbyEmail == null) {
      throw new BadRequestException('Incorrect data');
    }

    const passcomp = await compare(loginDto.password, userbyEmail.password);
    if (passcomp == false) {
      throw new BadRequestException('Incorrect data');
    }

    const token = this.JwtService.sign({ userId: userbyEmail.userId });

    return {
      userId: userbyEmail.userId,
      name: userbyEmail.name,
      surname: userbyEmail.surname,
      email: userbyEmail.email,
      token: token,
    };
  }

  async getById(userId: number) {
    return this.prisma.user.findFirst({ where: { userId } });
  }
}
