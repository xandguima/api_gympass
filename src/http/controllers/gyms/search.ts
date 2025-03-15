import { string, z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymService } from '@/services/factories/make-search-gym-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    q: string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { q, page } = searchGymQuerySchema.parse(request.query)

  const searchGymService = makeSearchGymService()
  const gyms = await searchGymService.execute({
    query: q,
    page,
  })

  reply.status(200).send(gyms)
}
