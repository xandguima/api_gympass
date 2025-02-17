import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNerbyGymsServiceRequest {
  userLongitude: number
  userLatitude: number
}
interface FetchNerbyGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNerbyGymsService {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLongitude,
    userLatitude,
  }: FetchNerbyGymsServiceRequest): Promise<FetchNerbyGymsServiceResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return {
      gyms,
    }
  }
}
