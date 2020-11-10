exports.render = function (req, res, code) {
    let message = null;
    switch (code) {
        case 403:
            message = "Resource Forbidden"
            break;
        case 404:
            message = "Page Not Found"
            break;
        case 422:
            message = "Unprocessable Entity"
        default:
            break;
    }
    res.render('index', { layout: 'error', title: 'Error', code: code, message: message});
}