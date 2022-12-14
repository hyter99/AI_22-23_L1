import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

import { PrismaService } from '../modules/database/prisma.service';
import type { Model, ModelKey } from '../types';

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
