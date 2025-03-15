import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validated(request: FastifyRequest, reply: FastifyReply) {
  const validatedCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })
  const { checkInId } = validatedCheckInParamsSchema.parse(request.query)

  const validateCheckInService = makeValidateCheckInService()
  await validateCheckInService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
