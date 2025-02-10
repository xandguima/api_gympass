import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInsService } from '../check-ins'
import { afterEach } from 'node:test'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from '../erros/max-number-of-check-ins-error'
import { MaxDistanceError } from '../erros/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInsService

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new CheckInsService(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-id',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    vi.isFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const { checkIn } = await sut.execute({
      userId: 'id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })
    console.log(checkIn.created_at)
    expect(checkIn.id).toEqual(expect.any(String))
  })

  // red, green, refactor
  // forma de padronizar datas nos testes, usar mocking

  it('should not be able to check in twice in the same day', async () => {
    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })
    await expect(() =>
      sut.execute({
        userId: 'user-id',
        gymId: 'gym-id',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should be able to check in twice but in same days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(
      sut.execute({
        userId: 'user-id',
        gymId: 'gym-id',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toThrow(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in on distant gym ', async () => {
    await gymRepository.create({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -5.8494827,
      longitude: -35.216974,
    })

    await expect(
      sut.execute({
        userId: 'user-id',
        gymId: 'gym-02',
        userLatitude: -5.8204942,
        userLongitude: -35.2185619,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
