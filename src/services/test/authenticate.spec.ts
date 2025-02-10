import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateService } from '../authenticateService'
import { hash } from 'bcryptjs'
import { InvalidCredencialsError } from '../erros/invalid-credencials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authencate Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'Joao',
      email: 'xande96@gmail.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'xande96@gmail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should be able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(userRepository)

    await expect(() => {
      return sut.execute({
        email: 'xande96@gmail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredencialsError)
  })
  it('should be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(userRepository)

    await userRepository.create({
      name: 'Joao',
      email: 'xande96@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() => {
      return sut.execute({
        email: 'xande96@gmail.com',
        password: '12346',
      })
    }).rejects.toBeInstanceOf(InvalidCredencialsError)
  })
})
