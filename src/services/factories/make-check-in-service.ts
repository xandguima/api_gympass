import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'
import { CheckInsService } from '../check-ins'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInService() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymRepository = new PrismaGymsRepository()
  const checkInService = new CheckInsService(checkInRepository, gymRepository)

  return checkInService
}
