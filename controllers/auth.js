exports.verify = function (req, res) {
    if (!req.session.user) {
        res.redirect('/login');
        return false;
    }
    return true;
}