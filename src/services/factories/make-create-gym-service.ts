import { CreateGymService } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'

export function makeCreateGymService() {
  const gymRepository = new PrismaGymsRepository()
  const gymService = new CreateGymService(gymRepository)

  return gymService
}
