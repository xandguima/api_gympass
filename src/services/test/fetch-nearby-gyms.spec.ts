import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNerbyGymsService } from '../fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository

let sut: FetchNerbyGymsService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNerbyGymsService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })
    await gymsRepository.create({
      title: 'Nearby Gym',
      description: '',
      phone: '',
      latitude: -5.8474784,
      longitude: -35.289486,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -5.8124232,
      longitude: -35.2161553,
    })
    const { gyms } = await sut.execute({
      userLatitude: -5.8124232,
      userLongitude: -35.2161553,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'TypeScript Gym' }),
        expect.objectContaining({ title: 'Nearby Gym' }),
      ]),
    )
  })
})
