import { UserRepostiory } from '@/repositories/user-repository'
import { InvalidCredencialsError } from './erros/invalid-credencials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AutenticateServiceRequest {
  email: string
  password: string
}

interface AutenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private userRepository: UserRepostiory) {}

  async execute({
    email,
    password,
  }: AutenticateServiceRequest): Promise<AutenticateServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredencialsError()
    }
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredencialsError()
    }
    return {
      user,
    }
  }
}
