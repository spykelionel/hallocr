const express = require('express')
const morgan = require('morgan')
const hostelRoute = require('./routes/hostel.route.js')
const app = express()


app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/hostel', hostelRoute)


app.use((req,res,next)=>{
    const err = new Error("Not Found")
    err.status = 404
    next(err)
})
app.use((err,req,res,next)=>{
    // res.header("Access-Control-Allow-Origin", "*")
    res.status(err.status || 500).json({
       error: {
            message: err.message || "endpoint not found",
            statusCode: err.status || 500,
            redirect: true,
            to: process.env.HOST
       }
    })
})

module.exports = app;