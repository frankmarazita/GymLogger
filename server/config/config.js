const dotenv = require('dotenv')

dotenv.config({ path: __dirname + '/../.env' })

const utility = require('../utils/utility')

// Server Date Offset Config
const date_config = require('./date.config.json')
if (date_config.appDate) {
    if (date_config.appDate !== '') {
        utility.date.enableDateOffset()
        let appDate = new Date(date_config.appDate)
        utility.date.setAppDate(appDate)
        console.log('Server Date Set to: ' + date_config.appDate)
    }
}