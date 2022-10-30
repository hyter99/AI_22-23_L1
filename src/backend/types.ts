import type { User, PrismaClient } from '@prisma/client';
import type { Request } from 'express';

type Remove$<T> = {
  [Key in keyof T as Key extends `$${string}` ? never : Key]: T[Key];
};

export type Model = keyof Remove$<typeof PrismaClient['prototype']>;

export type ModelKey<T extends Model> = keyof Parameters<
  typeof PrismaClient['prototype'][T]['create']
>[0]['data'];

export type RequestWithUser = Request & { user: User };
