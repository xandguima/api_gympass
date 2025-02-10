import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from '../registerService'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlredyExists } from '../erros/user-alredy-exists-error'

let userRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterService(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Joao',
      email: 'xande96@hotmail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'joao',
      email: 'joao@gmail.com',
      password: '123456',
    })
    const isPasswordCorretlyHashed = await compare('123456', user.password_hash)
    expect(isPasswordCorretlyHashed).toBe(true)
  })
  it('should not be able to register with same email twice', async () => {
    const email = 'xande96@hotmail.com'

    await sut.execute({
      name: 'joao',
      email,
      password: '123456',
    })
    await expect(() => {
      return sut.execute({
        name: 'marcelo',
        email,
        password: 'marcelo',
      })
    }).rejects.toBeInstanceOf(UserAlredyExists)
  })
})
