import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInsService } from '../validate-check-in'

export function makeValidateCheckInService() {
  const checkInRepository = new PrismaCheckInsRepository()
  const checkInService = new ValidateCheckInsService(checkInRepository)

  return checkInService
}
