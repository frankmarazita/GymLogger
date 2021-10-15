const CT = require('../constants/codeTables')

const IS_PRODUCTION = process.env.NODE_ENV === CT.System.C.Production

const jwt = require('jsonwebtoken')

const date = require('./date')

const privateKey = "testKey"
const algorithm = 'HS256'
const expiryTimeSeconds = 3600
const expires = true

/**
 * Creates a new JWT Session Token
 * @param {Object} payload
 * @returns {String}
 */
exports.createNewSessionToken = async function (data) {
    let now = date.now()
    let payload = {
        iat: now / 1000,
        exp: date.addSeconds(now, expiryTimeSeconds) / 1000,
        expires: expires && IS_PRODUCTION,
        user: data
    }
    let token = await jwt.sign(payload, privateKey, { algorithm: algorithm })
    try {
        return token
    } catch (error) {
        return null
    }
}

exports.check = async function (token) {
    try {
        let decoded = await jwt.verify(token, privateKey)
        return decoded
    } catch (error) {
        return false
    }
}