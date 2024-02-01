import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    UserEntity.validate = jest.fn()
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.name).toEqual(props.name)
    expect(sut.email).toEqual(props.email)
    expect(sut.password).toEqual(props.password)
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('Name field getter', () => {
    expect(sut.name).toBeDefined()
    expect(sut.name).toEqual(props.name)
    expect(typeof sut.name).toBe('string')
  })

  it('Name field setter', () => {
    sut['name'] = 'new name'
    expect(sut.name).toEqual('new name')
    expect(typeof sut.name).toBe('string')
  })

  it('Email field getter', () => {
    expect(sut.email).toBeDefined()
    expect(sut.email).toEqual(props.email)
    expect(typeof sut.email).toBe('string')
  })

  it('Password field getter', () => {
    expect(sut.password).toBeDefined()
    expect(sut.password).toEqual(props.password)
    expect(typeof sut.password).toBe('string')
  })

  it('Password field setter', () => {
    sut['password'] = 'new password'
    expect(sut.password).toEqual('new password')
    expect(typeof sut.password).toBe('string')
  })

  it('CreatedAt field getter', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('Should update user field', () => {
    sut.update('new user')
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.name).toEqual('new user')
  })

  it('Should update password field', () => {
    sut.updatePassword('new password')
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.password).toEqual('new password')
  })
})
