import { Entity } from '../../entity'
import { validate as uuidValidate } from 'uuid'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  let props: StubProps

  beforeEach(() => {
    props = {
      prop1: 'value1',
      prop2: 15,
    }
  })

  it('Shoud set props and id', () => {
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it('Shoud accept a valid uuid', () => {
    const id = '1c4d33fd-d4f5-4971-9d1d-e261dc11a53d'
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('Shoud convert entity to a JSON', () => {
    const id = '1c4d33fd-d4f5-4971-9d1d-e261dc11a53d'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
