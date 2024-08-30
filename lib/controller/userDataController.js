const { getUserDatabase } = require("../utils/mongoHelper")
const Joi = require('joi');
const userDataSchema = require('../models/userData');


const insertTransaction = async (req, res) => {
    const registerSchema = Joi.object({
        amount: Joi.number().required()
    }) 
    const valid = registerSchema.validate(req.body);
    if (valid.error) return res.status(400).json({ message: valid.error.details.map((x) => x.message)})
    try {
        const { amount } = req.body
        const { dbName } = req.user
        

        const userDb = await getUserDatabase(dbName);
        const userData = userDb.model('HistoryTransaction', userDataSchema)
        
        const newTransaction = new userData({
            transaction_date: new Date(),
            amount
        });

        await newTransaction.save();

        return res.status(200).json({ message: 'Transaction success '})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getTransaction = async (req, res) => {
    try {
        const { dbName } = req.user    

        const userDb = await getUserDatabase(dbName);
        const userData = userDb.model('HistoryTransaction', userDataSchema)
        
        const historyTransaction = await userData.find().skip(1)
        return res.status(200).json({ transactions: historyTransaction })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getCurrentBalance = async (req, res) => {
    try {
        const { dbName, name } = req.user    

        const userDb = await getUserDatabase(dbName);
        const userData = userDb.model('HistoryTransaction', userDataSchema)
        
        const sumResult = await userData.aggregate([
            { $match: {} },
            { $group : {
                _id: null,
                currentBalance: {$sum: `$amount`}
            }}
        ])

        const currBalance = sumResult && sumResult.length > 0 ? sumResult[0].currentBalance : 0;
        return res.status(200).json({ currBalance, name })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { insertTransaction, getTransaction, getCurrentBalance }