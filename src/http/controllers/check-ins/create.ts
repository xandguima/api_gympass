import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCkeckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCkeckInBodySchema.parse(request.body)

  const createCheckInService = makeCheckInService()
  await createCheckInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  reply.status(201).send({})
}
