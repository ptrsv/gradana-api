const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    transaction_date: Date,
    amount: Number
});

module.exports = userDataSchema;