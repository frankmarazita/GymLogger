
module.exports = {

    /**
     * Capitalize first letter of a string
     * @param {string} str - String to capitalize
     * @returns {string}
     */
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}