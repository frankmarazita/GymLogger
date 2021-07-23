module.exports = {
    get: async function (req, res) {
        delete req.session.user
        return res.redirect('/login')
    }
}