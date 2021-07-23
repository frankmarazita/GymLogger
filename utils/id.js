const random = require('./random')

const charset = ['0', '1', '2', '3', '4', '5', '6', '7',
                 '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

module.exports = {
    /**
     * New random string of a specified base and length
     * @param {number} length - Length of string
     * @param {number} [base=charset.length] - Base of string between [1, 16]
     * @returns {string}
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
    },

    /**
     * New random separated id with specified number of sections and chars
     * i.e. 12345-12345-12345-12345
     * @param {number} sections - Number of sections
     * @param {number} chars - Number of characters in each section
     * @param {number} [base=charset.length] - Base of string between [1, 16]
     * @param {string} [delimiter='-'] - Delimiter between sections
     * @returns {string}
     */
    newX: function (sections, chars, base = charset.length, delimiter = '-') {
        let id = ''
        sections = Math.floor(sections)
        chars = Math.floor(chars)
        base = Math.floor(base)
        for (let i = 0; i < sections; i++) {
            if (base > charset.length) base = charset.length
            if (base <= 0) base = 1
            for (let j = 0; j < chars; j++) {
                id += charset[random.get(0, base - 1)]
            }
            if (i + 1 != sections) id += delimiter
        }
        return id
    }
}