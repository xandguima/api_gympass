import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredencialsError } from '@/services/erros/invalid-credencials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const body = authenticateBodySchema.parse(request.body)
  const { email, password } = body

  try {
    const authenticateService = makeAuthenticateService()

    await authenticateService.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredencialsError) {
      return reply.status(401).send({ messege: error.message })
    }
    reply.status(500).send()
  }

  reply.status(200).send()
}
