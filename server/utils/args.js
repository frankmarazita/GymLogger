const EM = require('../constants/errorMessages')

module.exports = {

    verify: function (args, numArgs = null) {
        let length = 0
        try {
            if (numArgs === null || length === args.length) {
                length = args.length
            } else if (numArgs != args.length) {
                throw new Error(EM.Args.IncorrectNumberOfArgs)
            }
        } catch (err) {
            console.error(err)
            return false
        }
        // for (let i = 0; i < length; i++) {
        //     if (args[i] === null) {
        //         return false
        //     }
        // }
        return true
    }

}