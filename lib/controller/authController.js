const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { config } = require('../../config')
const { createUserDataDatabase } = require('../utils/mongoHelper');
const { validateEmail, validatePassword, generateRandomString } = require('../utils/utility');

const register = async (req,res) => {
    const { email, phone, name, password } = req.body;

    try {
        const existingUser = await user.findOne({
            $or: [
                {email},
                {phone}
            ]
        });
    
        if (existingUser) {
            return res.status(500).json({ message: "User already exists" });
        }

        
        const invalidEmail = validateEmail(email);

        if (!invalidEmail) {
            return res.status(500).json({ message: "Wrong email format" });
        }
    
        const hashedPassword = await bycrpt.hash(password, 10);
        const uniqueDbName = generateRandomString(email)
        const userDbName = `userdb_${uniqueDbName}`
    
        const newUser = new user({
            email,
            phone,
            name,
            password: hashedPassword,
            dbName: userDbName
        });
    
        await newUser.save();
        await createUserDataDatabase(userDbName);
    
        return res.status(200).json({ message: 'User registered successfully' })
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const existsUser = await user.findOne({ email });
        const validPassword = await validatePassword(password, existsUser.password);

        if (existsUser && validPassword) {
            
            const token = jwt.sign(
                { email: existsUser.email, name: existsUser.name, dbName: existsUser.dbName},
                config.SECREET_KEY,
                {expiresIn: '1h'} 
            )
            
            return res.status(200).json({ message: 'Logged in successfully', token })
        } else {
            return res.status(500).json({ message: 'invalid credential '})
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }    
}

module.exports = { register, login }