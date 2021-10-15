const jwt = require('jsonwebtoken')

exports.decode = async function (token) {
    try {
        let decoded = await jwt.decode(token)
        return decoded
    } catch (error) {
        return false
    }
}