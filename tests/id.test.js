const id = require('../controllers/id');

const charset = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

describe('ID Generation', () => {
  beforeAll(async () => {
  })

  test('new random id', async () => {

    const length = 24

    for (let base = 1; base <= charset.length; base++) {
      const testCharset = charset.slice(0, base)
      const testId = id.new(length, base)

      for (let i = 0; i < testId.length; i++) {
        if (!testCharset.includes(testId.charAt(i))) {
          console.error('testId.charAt(i):', testId.charAt(i))
          fail('char fail')
        }
      }

      if (testId.length != length) {
        console.error('testId.length:', testId.length, '\nlength:', length)
        fail('length fail')
      }
    }

  })

  afterAll(async () => {
  })
})