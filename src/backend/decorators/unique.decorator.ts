import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { PrismaService } from '../modules/database/prisma.service';

type Remove$<T> = {
  [Key in keyof T as Key extends `$${string}` ? never : Key]: T[Key];
};

type Model = keyof Remove$<typeof PrismaClient['prototype']>;

type ModelKey<T extends Model> = keyof Parameters<
  typeof PrismaClient['prototype'][T]['create']
>[0]['data'];

export const Unique = <T extends Model>(
  target: T,
  property: ModelKey<T>,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [target, property],
      validator: UniqueConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueConstraint<T extends Model>
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: any, args: ValidationArguments) {
    try {
      const [module, uniqueKey] = args.constraints as [T, ModelKey<T>];
      const entry: object | null = await (this.prisma[module].findFirst as any)(
        {
          where: { [uniqueKey]: value },
        },
      );

      if (entry) {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [module, uniqueKey] = args.constraints as [Model, ModelKey<Model>];

    return `${module}.${uniqueKey} is not unique`;
  }
}
