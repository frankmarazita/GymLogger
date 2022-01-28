const config = require('../config/config')
const db = require('../db/db')

describe('Database', () => {
  beforeAll(async () => {
  })

  test('connect / disconnect database', async () => {
    await db.init(process.env.MONGODB_URI, process.env.DB_NAME)
    expect(await db.connected()).toBe(true)

    await db.close()
    expect(await db.connected()).toBe(false)
  })

  afterAll(async () => {
  })
})