module.exports = {

    /**
     * Returns the date with the current timezone
     * @param {Date} date
     * @returns {Date}
     */
    applyTimezoneOffset: function (date) {
        return new Date(date.getTime() - date.getTimezoneOffset()*60000)
    },

    /**
     * Returns the current timezone offset
     * @returns
     */
    getTimezoneOffset: function () {
        return new Date().getTimezoneOffset()
    },

    /**
     * Returns Date String in d/m/y format
     * @param {Date} date - Date
     * @returns {String}
     */
    toStringDMY: function (date) {
        let d = date.getDate()
        let m = date.getMonth() + 1
        let y = date.getFullYear()
        return d + '/' + m + '/' + y
    },

    /**
     * Returns Date String in y/m/d format
     * @param {Date} date - Date
     * @returns {String}
     */
    toStringYMD: function (date) {
        let d = date.getDate()
        let m = date.getMonth() + 1
        let y = date.getFullYear()
        return y + '/' + m + '/' + d
    },

    /**
     * Returns Formatted Date String for data form
     * @param {Date} date - Date
     * @returns {String}
     */
    toString: function (date) {
        return date.toISOString().substring(0, 16)
    },

    /**
     * Returns a Date converted from a string
     * @param {String} dateString
     * @returns {Date}
     */
    stringToDate: function (dateString) {
        return new Date(dateString)
    },

    addSeconds: function (date, seconds) {
        return new Date(date.getTime() + seconds * 1000)
    },

    addMinutes: function (date, minutes) {
        return new Date(date.getTime() + minutes * 60000)
    },

    addHours: function (date, hours) {
        return new Date(date.getTime() + hours * 3600000)
    }

}