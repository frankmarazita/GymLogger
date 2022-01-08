const jwt = require('../utils/jwt')

describe('JWT', () => {
    beforeAll(async () => {
    })

    test('new token', async () => {

        let sessionData = {
            id: "123456789",
            authenticated: true,
        }

        let token = await jwt.createNewSessionToken(sessionData)
        console.log(token)
        let valid = await jwt.check(token) !== false
        expect(valid).toBe(true)
    })

    afterAll(async () => {
    })
})