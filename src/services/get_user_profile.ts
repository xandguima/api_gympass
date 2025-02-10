import { UserRepostiory } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetUserProfileServiceRequest {
  userId: string
}
interface GetrUserPreofileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private userRepository: UserRepostiory) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetrUserPreofileServiceResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
