const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config();

const port = process.env.PORT || 3000

const server = http.createServer(app)

const uri = `${process.env.HOST}/${process.env.DBNAME}`;

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, async(err)=>{
    if(err){
        console.log("Couldn't connnect")
        console.error(err?.stack)
        
    } else {
        console.log("Connected successsfully")
    }
})

server.listen(port, (err)=>{
    if(err){
        console.error(err, "couldn't connect to", port)
    }
    console.clear();
    console.log("Server is running at", port)
})