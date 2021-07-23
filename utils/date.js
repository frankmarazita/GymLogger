
// TODO Only allow for dateDiff when not running in production
let dateDiff = 0

module.exports = {

    /**
     * Sets the application date
     * @param {Date} date - Date
     * @returns {Date}
     */
    setDate: function (date) {
        let now = new Date()
        dateDiff = date.getTime() - now.getTime()
        return this.now()
    },

    /**
     * Return the current application date
     * @returns {Date}
     */
    now: function () {
        let now = new Date()
        now.setTime(now.getTime() + dateDiff)
        return now
    },

    /**
     * Get Date of Today
     * @returns {Date}
     */
    today: function () {
        return this.now().setHours(0, 0, 0, 0)
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
     * Returns Formatted Date String for data form
     * @param {Date} date - Date
     * @returns {String}
     */
    toStringData: function (date) {
        return date.toISOString().substring(0, 16)
    },

    /**
     * Returns a Date converted from a string
     * @param {String} dateString
     * @returns {Date}
     */
    stringToDate: function (dateString) {
        return new Date(dateString)
    }

}