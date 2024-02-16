import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts'
import { ListUsersUseCase } from '@/users/application/usecases/listusers.usecase'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class ListUsersDto implements ListUsersUseCase.Input {
  @ApiPropertyOptional({ description: 'Returned page' })
  @IsOptional()
  page?: number

  @ApiPropertyOptional({ description: 'Per page row count' })
  @IsOptional()
  perPage?: number

  @ApiPropertyOptional({ description: 'Sortable field' })
  @IsOptional()
  sort?: string

  @ApiPropertyOptional({ description: 'Sorting direction. Either asc or desc' })
  @IsOptional()
  sortDir?: SortDirection

  @ApiPropertyOptional({ description: 'Filterable field' })
  @IsOptional()
  filter?: string
}
