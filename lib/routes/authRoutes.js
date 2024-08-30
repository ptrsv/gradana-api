const express = require('express');
const { register, login } = require('../controller/authController');
const router = express.Router();
// const Joi = require('joi');
// const validator = require('express-joi-validation').createValidator({})

// const registerSchema = Joi.object({
//     email: Joi.string().required(),
//     phone: Joi.string().required(),
//     name: Joi.string().required(),
//     password: Joi.string().required(),
// })

router.post('/register', register)
router.post('/login', login)

module.exports = router;