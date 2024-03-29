const CT = require('../constants/codeTables')

const config = require('../config/config')

const IS_PRODUCTION = process.env.NODE_ENV === CT.System.Production
const IS_DEVELOPMENT = process.env.NODE_ENV === CT.System.Development

let dateOffsetEnabled = false
let dateOffset = 0

module.exports = {

    enableDateOffset: function () {
        if (IS_DEVELOPMENT) {
            dateOffsetEnabled = true
        }
    },

    disableDateOffset: function () {
        if (IS_DEVELOPMENT) {
            dateOffsetEnabled = false
            dateOffset = 0
        }
    },

    /**
     * Sets the application date
     * @param {Date} date - Date
     * @returns {Date}
     */
    setAppDate: function (date) {
        if (dateOffsetEnabled) {
            let now = new Date()
            dateOffset = date.getTime() - now.getTime()
        }
        return this.now()
    },

    /**
     * Return the current application date
     * @returns {Date}
     */
    now: function () {
        let now = new Date()
        now.setTime(now.getTime() + dateOffset)
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
     * Returns Formatted Date String for data form
     * @param {Date} date - Date
     * @returns {String}
     */
    toString: function (date) {
        return date.toISOString().substring(0, 16)
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
    },

    addDays: function (date, days) {
        return new Date(date.getTime() + days * 86400000)
    },

    addMonths: function (date, months) {
        let d = new Date(date)
        d.setMonth(d.getMonth() + months)
        return d
    },

    addYears: function (date, years) {
        let d = new Date(date)
        d.setFullYear(d.getFullYear() + years)
        return d
    }

}

// Server Date Offset Config
if (config.date.appDate) {
    if (config.date.appDate !== '') {
        module.exports.enableDateOffset()
        let appDate = new Date(config.date.appDate)
        module.exports.setAppDate(appDate)
        console.log('Server Date Set to: ' + config.date.appDate)
    }
}