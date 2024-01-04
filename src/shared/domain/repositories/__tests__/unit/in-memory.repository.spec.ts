import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRespository } from '../../in-memory.repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRespository<StubEntity> {}

describe('InMemoryRespository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findById(entity.id)

    expect(result.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('Should return all entities', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findAll()

    expect(result).toStrictEqual([entity])
  })

  it('Should throw an error on update when the entity is not found', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })

    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should update an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    const updatedEntity = new StubEntity(
      { name: 'updated', price: 10 },
      entity.id,
    )
    await sut.update(updatedEntity)

    expect(updatedEntity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw an error on delete when the entity is not found', async () => {
    await expect(sut.delete('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should delte an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 })
    await sut.insert(entity)
    await sut.delete(entity.id)

    expect(sut.items).toHaveLength(0)
  })
})
