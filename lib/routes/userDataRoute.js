const express = require('express');
const { insertTransaction, getTransaction, getCurrentBalance } = require('../controller/userDataController');
const auth = require('../utils/auth');
const router = express.Router();
// const Joi = require('joi');
// const validator = require('express-joi-validation').createValidator({})

// const registerSchema = Joi.object({
//     email: Joi.string().required(),
//     phone: Joi.string().required(),
//     name: Joi.string().required(),
//     password: Joi.string().required(),
// })

router.post('/add-transaction', auth, insertTransaction);
router.get('/get-transaction', auth, getTransaction);
router.get('/get-current-balance', auth, getCurrentBalance)
module.exports = router;