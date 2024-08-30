const mongoose = require('mongoose');
const { config } = require('../../config');
const userDataSchema = require('../models/userData');

async function createUserDataDatabase(dbName) {
    dbName = dbName.replaceAll('@', '')
    const userDb = await mongoose.createConnection(`${config.USER_MONGO_URI}${dbName}?retryWrites=true&w=majority`);
    const userData = userDb.model('HistoryTransaction', userDataSchema);

    await new userData().save();
    await userDb.close();
}

async function getUserDatabase(dbName) {
    return mongoose.createConnection(`${config.USER_MONGO_URI}${dbName}?retryWrites=true&w=majority`);
}

module.exports = { createUserDataDatabase, getUserDatabase }