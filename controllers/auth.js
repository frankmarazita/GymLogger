exports.verify = function (req, res) {
    if (!req.session.email) {
        res.redirect('/login');
        return false;
    }
    return true;
}