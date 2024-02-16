import { SigninUseCase } from '@/users/application/usecases/signin.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SigninDto implements SigninUseCase.Input {
  @ApiProperty({ description: "User's email" })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ description: "User's password" })
  @IsString()
  @IsNotEmpty()
  password: string
}
