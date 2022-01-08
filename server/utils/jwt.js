const CT = require('../constants/codeTables')

const jwt = require('jsonwebtoken')

const date = require('./date')

const config = require('../config/config')

const privateKey = process.env.JWT_PRIVATE_KEY
const algorithm = config.jwt.algorithm
const expiryTimeSeconds = config.jwt.expiryTimeSeconds

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

exports.decode = async function (token) {
    try {
        let decoded = await jwt.decode(token)
        return decoded
    } catch (error) {
        return false
    }
}