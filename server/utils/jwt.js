const CT = require('../constants/codeTables')

const jwt = require('jsonwebtoken')

const date = require('./date')

const config = require('../config/config')

const privateKey = process.env.JWT_PRIVATE_KEY
const algorithm = config.jwt.algorithm
const expiryTimeSeconds = config.jwt.expiryTimeSeconds

/**
 * Creates a new JWT Session Token
 * @param {Object} userData - User data
 * @param {Object} personalAccessTokenData - Personal Access Token data
 * @param {Date} exp - Expiry date
 * @returns {String}
 */
exports.createNewSessionToken = async function (userData, personalAccessTokenData = null, exp = null) {
    let now = date.now()
    let payload = {
        iat: now / 1000,
        exp: date.addSeconds(now, expiryTimeSeconds) / 1000,
        user: userData
    }

    if (personalAccessTokenData) payload.personalAccessToken = personalAccessTokenData
    if (exp) payload.exp = exp / 1000

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

exports.decode = async function (token) {
    try {
        let decoded = await jwt.decode(token)
        return decoded
    } catch (error) {
        return false
    }
}