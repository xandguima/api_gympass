import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsServiceHistoryService } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryService() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useService = new FetchUserCheckInsServiceHistoryService(
    checkInRepository,
  )

  return useService
}
