import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Name field getter', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Name field setter', () => {
    sut['name'] = 'new name'
    expect(sut.props.name).toEqual('new name')
    expect(typeof sut.props.name).toBe('string')
  })

  it('Email field getter', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('Password field getter', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Password field setter', () => {
    sut['password'] = 'new password'
    expect(sut.props.password).toEqual('new password')
    expect(typeof sut.props.password).toBe('string')
  })

  it('CreatedAt field getter', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Should update user field', () => {
    sut.update('new user')
    expect(sut.props.name).toEqual('new user')
  })

  it('Should update password field', () => {
    sut.updatePassword('new password')
    expect(sut.props.password).toEqual('new password')
  })
})
