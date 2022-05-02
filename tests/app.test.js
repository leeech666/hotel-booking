const request = require('supertest')
const app = require('../app')

const reservationPath = 'presidential_reservation'
describe('test get', () => {
  it('should get a message1', async () => {
    const res = await request(app).get(`/${reservationPath}`)
    console.log(res.text)
    expect(res.statusCode).toBe(200)
  })
  it('should get a message2', async () => {
    const res = await request(app).get('/')
    console.log(res.text)
    expect(res.statusCode).toBe(200)
  })
})
describe('test Post Endpoints', () => {
  it('should create a new reservation', async () => {
    const res = await request(app).post(`/${reservationPath}`).send({
      first_name: 'a2kl',
      last_name: 'a2gf',
      check_in: '2-12-2023',
      check_out: '2-14-2023',
      number_people: 2,
      email: 'ddd@kkk.com',
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body.length).not.toEqual(0)
  })
  it('should fail to create a new reservation,no email', async () => {
    const res = await request(app).post(`/${reservationPath}`).send({
      first_name: 'a2kl',
      last_name: 'a2gf',
      check_in: '2-12-2023',
      check_out: '2-14-2023',
      number_people: 2,
    })

    expect(res.statusCode).toEqual(400)
  })
  it('suppose to retrieve a reservation', async () => {
    const res = await request(app).get(`/${reservationPath}/cell1651326887522`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.length).not.toBe(0)
  })
  it('fail to retrieve a reservation-id not exist', async () => {
    const res = await request(app).get(`/${reservationPath}/654321`)

    expect(res.statusCode).toEqual(404)
  })
  it('fail to retrieve a reservation-id format not correct', async () => {
    const res = await request(app).get(`/${reservationPath}/$`)

    expect(res.statusCode).toEqual(404)
  })
  it('suppose to delete a reservation', async () => {
    const res = await request(app).delete(
      `/${reservationPath}/cell1651326887522`
    )

    expect(res.statusCode).toEqual(204)
  })
  it('fail to delete a reservation--not existing', async () => {
    const res = await request(app).delete(
      `/${reservationPath}/cell1651326887522`
    )

    expect(res.statusCode).toEqual(404)
  })
  it('endpoint not existing', async () => {
    const res = await request(app).get('/notexisting')

    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatch('endpoint not existing')
  })
})
