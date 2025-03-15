import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UserAlredyExists } from '@/services/erros/user-alredy-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const body = registerSchema.parse(request.body)
  const { name, email, password } = body

  try {
    const registerService = makeRegisterService()
    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlredyExists) {
      return reply.status(409).send({ messege: error.message })
    }
    throw error
  }

  reply.status(201).send()
}
