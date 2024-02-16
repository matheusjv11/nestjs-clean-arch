import { SignupUseCase } from '@/users/application/usecases/signup.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignupDto implements SignupUseCase.Input {
  @ApiProperty({ description: "User's name" })
  @IsString()
  @IsNotEmpty()
  name: string

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
