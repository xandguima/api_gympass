import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'
import { SearchGymsService } from '../search-gym'

export function makeSearchGymService() {
  const gymRepository = new PrismaGymsRepository()
  const gymService = new SearchGymsService(gymRepository)

  return gymService
}
