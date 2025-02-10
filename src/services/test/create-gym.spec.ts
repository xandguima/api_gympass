import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from '../create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymRepository)
  })

  it('should be able to create Gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
