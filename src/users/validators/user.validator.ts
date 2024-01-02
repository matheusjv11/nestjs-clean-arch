import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { UserProps } from '../domain/entities/user.entity'
import { ClassValidatorField } from '@/shared/domain/validators/class-validator-fields'

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsOptional()
  createdAt?: Date

  constructor({ email, name, password, createdAt }: UserProps) {
    Object.assign(this, { email, name, password, createdAt })
  }
}

export class UserValidator extends ClassValidatorField<UserRules> {
  validate(data: any): boolean {
    return super.validate(new UserRules(data ?? {}))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
