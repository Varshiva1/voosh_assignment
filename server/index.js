const express = require('express');
const app = express();

const cors = require('cors')

app.use(express.json());
app.use(cors())
const mongoose = require('mongoose')
require('./db')

const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
app.use( userRoutes);
app.use( orderRoutes);


const port = process.env.PORT || 3000 

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
