const config = require('../config/config')
const db = require('../controllers/db');

describe('Database', () => {
  beforeAll(async () => {
  });

  test('connect / disconnect database', async () => {
    await db.init(process.env.MONGODB_SECRET, process.env.DB_NAME);
    expect(db.connected()).toBe(true);
    await db.close();
    expect(db.connected()).toBe(false);
  });

  afterAll(async () => {
  });
});