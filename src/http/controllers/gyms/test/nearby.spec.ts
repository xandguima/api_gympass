import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/services/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to Nearby Gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '11999999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Python Gym',
        description: 'Some description',
        phone: '11999999999',
        latitude: -5.8822107,
        longitude: -35.2184099,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -5.8822107,
        longitude: -35.2184099,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Python Gym',
      }),
    ])
  })
})
