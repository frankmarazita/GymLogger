const date = require('../utils/date')

// TODO Complete this test

describe('Date', () => {
  beforeAll(async () => {
  })

  test('new date', async () => {

    let newDate = new Date('2020-01-01')
    date.setDate(newDate)
    console.log(date.now())

  })

  afterAll(async () => {
  })
})