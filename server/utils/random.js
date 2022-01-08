const mathrandom = require('math-random')

module.exports = {
    /**
     * Get random number between [a, b]
     * @param {number} a - Lower value
     * @param {number} b - Upper value
     * @returns {number}
     */
    get: function (a, b) {
        a = Math.floor(a)
        b = Math.floor(b) + 1
        return Math.floor(mathrandom() * (b - a)) + a
    }
}