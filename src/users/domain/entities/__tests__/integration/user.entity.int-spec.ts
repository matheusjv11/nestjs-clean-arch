import { EntityValidationError } from '@/shared/domain/errors/validation-errors'
import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating an user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: '',
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw an error when creating an user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: '',
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw an error when creating an user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: '',
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should throw an error when creating an user with invalid createdAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2024' as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it('Should be a valida user', () => {
      // With this validation, the test will throw an error if there is at least 1 exception
      expect.assertions(0)

      let props: UserProps = {
        ...UserDataBuilder({}),
      }

      new UserEntity(props)
    })
  })
})
