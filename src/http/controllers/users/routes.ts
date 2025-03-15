import { register } from './register'
import { profile } from './profile'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
