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

export const Exists = <T extends Model>(
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
      validator: ExistsConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class ExistsConstraint<T extends Model>
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
        return true;
      }
    } catch (e) {
      console.error(e);
      return false;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [module, uniqueKey] = args.constraints as [Model, ModelKey<Model>];

    return `${module}.${uniqueKey} with value ${args.value} does not exists`;
  }
}
