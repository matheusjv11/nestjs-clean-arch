import { ValidationError } from '@/shared/domain/errors/validation-errors'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { User } from '@prisma/client'

export class UserModelMapper {
  static toEntity(model: User) {
    const data = {
      name: model.name,
      email: model.email,
      password: model.password,
      createdAt: model.createdAt,
    }

    try {
      return new UserEntity(data, model.id)
    } catch (error) {
      throw new ValidationError('Could not load entity')
    }
  }
}
