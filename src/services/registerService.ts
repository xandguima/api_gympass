import { UserRepostiory } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlredyExists } from './erros/user-alredy-exists-error'
import { User } from '@prisma/client'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}
interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private useRepository: UserRepostiory) {}

  async execute({
    name,
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const userWithSameEmail = await this.useRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlredyExists()
    }
    const password_hash = await hash(password, 6)

    const user = await this.useRepository.create({
      name,
      email,
      password_hash,
    })
    return {
      user,
    }
  }
}
