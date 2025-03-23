import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  if (!request.cookies.refreshToken) {
    return reply.status(401).send({ messege: 'Unauthorized' })
  }
  await request.jwtVerify({
    onlyCookie: true,
  })

  const token = await reply.jwtSign(
    {
      role: request.user.role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    {
      role: request.user.role,
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
