exports.render = function (req, res, code) {
    let message = null;

    if (code === 400) {
        message = "Bad Request";
    } else if (code === 401) {
        message = "Authorization Request";
    } else if (code === 403) {
        message = "Resource Forbidden";
    } else if (code === 404) {
        message = "Page Not Found";
    } else if (code === 408) {
        message = "Request Timeout";
    } else if (code === 410) {
        message = "Gone or Deleted";
    } else if (code === 422) {
        message = "Unprocessable Entity";
    }

    res.render('index', { layout: 'error', title: 'Error', code: code, message: message });
}