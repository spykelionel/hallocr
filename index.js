const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config();

const port = process.env.PORT || 3000

const server = http.createServer(app)

const uri = `${process.env.URI}` || `${process.env.HOST}/${process.env.DBNAME}`;
const uri_local = `${process.env.HOST}/${process.env.DBNAME}`;
// const uri = `mongodb+srv://deva:<password>@cluster0.l3bi3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri_local, {useUnifiedTopology: true, useNewUrlParser: true}, async(err)=>{
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