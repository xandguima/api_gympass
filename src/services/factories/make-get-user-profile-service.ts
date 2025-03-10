import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileService } from '../get-user-profile'

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository()
  const useService = new GetUserProfileService(usersRepository)
  return useService
}
