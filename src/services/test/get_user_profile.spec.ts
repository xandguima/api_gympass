import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileService } from '../get_user_profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../erros/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get user profile service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(userRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'Alexandre',
      email: 'xand@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Alexandre')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => {
      return sut.execute({
        userId: 'non-existing-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
