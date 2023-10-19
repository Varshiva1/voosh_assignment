const express = require('express');
const app = express();
const mongoose = require('mongoose')

const cors = require('cors')

app.use(express.json());
app.use(cors())
require('./db')

const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const googleRoutes= require('./routes/googleRoute');
app.use( userRoutes); 
app.use( orderRoutes);
app.use( googleRoutes);


const port = process.env.PORT || 5000 

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
