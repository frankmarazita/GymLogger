const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hash = async function (password) {
    return await bcrypt.hash(password, saltRounds);
}

exports.check = async function (password, hash) {
    return await bcrypt.compare(password, hash);
}