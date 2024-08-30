const express = require('express');
const cors = require('cors');
const authRoutes = require('./lib/routes/authRoutes');
const userDataRoutes = require('./lib/routes/userDataRoute')
const { config } = require('./config');
const mogoose = require('mongoose');

mogoose.connect(config.SYSTEM_MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes)
app.use('/user', userDataRoutes)

const port = 9000;

app.listen(port, () => console.log(`server running on port ${port}`))