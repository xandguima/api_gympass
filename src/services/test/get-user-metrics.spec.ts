import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMertricsService } from '../get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository

let sut: GetUserMertricsService

describe('Get user Metrics Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMertricsService(checkInRepository)
  })

  it('should be able to get check-in count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })

  // red, green, refactor
  // forma de padronizar datas nos testes, usar mocking
})
