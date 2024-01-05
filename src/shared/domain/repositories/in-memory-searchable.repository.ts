import { Entity } from '../entities/entity'
import { InMemoryRespository } from './in-memory.repository'
import { SearchableRepositoryInterface } from './searchable-repository-contracts'

export abstract class InMemorySearchableRespository<E extends Entity>
  extends InMemoryRespository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
