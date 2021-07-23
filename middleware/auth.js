module.exports = {

    verifyDefault: function (req, res) {
        if (!req.session.user) {
            res.redirect('/login')
            return false
        }
        return true
    },

    verify: function (req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login')
        }
        next()
    },

    verifyFalse: function (req, res, next) {
        if (req.session.user) {
            return res.redirect('/')
        }
        next()
    }

}