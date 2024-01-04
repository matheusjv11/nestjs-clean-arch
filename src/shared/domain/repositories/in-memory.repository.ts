import { Entity } from '../entities/entity'
import { NotFoundError } from '../errors/not-found-error'
import { RepositoryInterface } from './repository-contracts'

export abstract class InMemoryRespository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findById(id: string): Promise<E> {
    return this._get(id)
  }

  async findAll(): Promise<E[]> {
    return this.items
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id)
    const index = this._getItemIndex(entity.id)
    this.items[index] = entity
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    const index = this._getItemIndex(id)
    this.items.splice(index, 1)
  }

  protected async _get(id: string): Promise<E> {
    const _id = `${id}`
    const foundEntity = this.items.find(item => item.id === _id)

    if (!foundEntity) {
      throw new NotFoundError('Entity not found')
    }

    return foundEntity
  }

  protected _getItemIndex(id: string): number {
    return this.items.findIndex(item => item.id === id)
  }
}
