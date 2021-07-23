const id = require('../utils/id')

const charset = ['0', '1', '2', '3', '4', '5', '6', '7',
                 '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

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

  test('new random 5x5 id', async () => {

    const sections = 5
    const chars = 5
    const delimiter = '-'

    for (let base = 1; base <= charset.length; base++) {
      const testCharset = charset.slice(0, base)
      const testId = id.newX(sections, chars, base, delimiter)

      let delimAdjust = 0
      for (let i = 0; i < sections; i++) {
        for (let j = 0; j < chars; j++) {
          if (!testCharset.includes(testId.charAt((i * chars) + j + delimAdjust))) {
            console.error('testId.charAt(i):', testId.charAt((i * chars) + j + delimAdjust))
            fail('char fail')
          }
        }
        if (i + 1 != sections) delimAdjust += 1
      }

      if (testId.length != sections * chars + sections - 1) {
        console.error('testId.length:', testId.length, '\nlength:', sections * chars + sections - 1)
        fail('length fail')
      }
    }

  })

  afterAll(async () => {
  })
})