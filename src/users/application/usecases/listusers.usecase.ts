import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserOutput, UserOutputMapper } from '../dtos/user-output'
import { UseCase as DefaultUseCase } from '@/shared/application/use-case/use-case'
import { SearchInput } from '@/shared/application/dtos/search-input'
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output'

export namespace ListUsersUseCase {
  export type Input = SearchInput

  export type Output = PaginationOutput<UserOutput>

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input)
      const seachResult = await this.userRepository.search(params)

      return this.toOutput(seachResult)
    }

    private toOutput(seachResult: UserRepository.SearchResult): Output {
      const items = seachResult.items.map(item => {
        return UserOutputMapper.toOutput(item)
      })

      return PaginationOutputMapper.toOutput(items, seachResult)
    }
  }
}
