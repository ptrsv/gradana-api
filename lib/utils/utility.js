const crypto = require('crypto')
const bycrpt = require('bcryptjs')

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


async function validatePassword(password, dbPassword) {
    return bycrpt.compare(password, dbPassword)
}

function generateRandomString(email) {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const hashPart = crypto.createHash('sha256').update(email).digest('hex').substring(0, 10); // Shortened hash
    return hashPart + randomPart;
}


module.exports = { validateEmail, validatePassword, generateRandomString }