import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository'
import { BcryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider'
import { SigninUseCase } from '../application/usecases/signin.usecase'
import { UserRepository } from '../domain/repositories/user.repository'
import { HashProvider } from '@/shared/application/providers/hash-provider'

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    {
      provide: SigninUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SigninUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
  ],
})
export class UsersModule {}
