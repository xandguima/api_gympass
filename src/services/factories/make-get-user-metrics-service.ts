import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMertricsService } from '../get-user-metrics'

export function makeGetUserMetricsService() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useService = new GetUserMertricsService(checkInRepository)

  return useService
}
