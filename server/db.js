const mongoose = require('mongoose')
mongoose.set('debug',true)

mongoose.connect("mongodb://127.0.0.1:27017/voosh_assignment",{         //connecting with db
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Successful")       //if connected
}).catch(()=>{
    console.log("No Connection")     //if not connected
})