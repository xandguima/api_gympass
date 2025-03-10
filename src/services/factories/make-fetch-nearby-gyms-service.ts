import { FetchNerbyGymsService } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'

export function makeFetchNearbyGymsService() {
  const gymRepository = new PrismaGymsRepository()
  const gymService = new FetchNerbyGymsService(gymRepository)

  return gymService
}
