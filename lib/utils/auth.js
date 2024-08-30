const jwt = require('jsonwebtoken');
const { config } = require('../../config');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token' })
    }

    try {
        const decoded = jwt.verify(token, config.SECREET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Token is not valid' })
    }
}