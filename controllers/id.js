const random = require('./random')

const charset = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

module.exports = {
    /**
     * New random string of a specified base and length
     * @param {number} length - Length of string
     * @param {number} [base=charset.length] base - Base of string between [1, 16]
     * @returns {number}
     */
    new: function (length, base = charset.length) {
        length = Math.floor(length)
        base = Math.floor(base)
        if (base > charset.length) base = charset.length
        if (base <= 0) base = 1
        let id = ''
        for (let i = 0; i < length; i++) {
            id += charset[random.get(0, base - 1)]
        }
        return id
    }
}