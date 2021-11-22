const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const hostelRoute = require('./routes/hostel.route')
const roomRoute = require('./routes/room.route')
const studentRoute = require('./routes/student.route')
const roleRoute = require('./routes/role.route')
const userRoute = require('./routes/user.route')
// const config = require('config')

const app = express()


app.use(morgan('dev'))
app.use(cors({origin: ["*"],}))
app.use(compression())
app.use(helmet())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/uploads', express.static('uploads')) // get public files
app.use('/api/hostel', hostelRoute)
app.use('/api/room', roomRoute)
app.use('/api/student', studentRoute)
app.use('/api/role', roleRoute)
app.use('/api/user', userRoute)


app.use(identifyError,handleError)

function identifyError(req,res,next){
    const err = new Error("Not Found")
    err.status = 404
    next(err)
}
function handleError(err,req,res){
    // res.header("Access-Control-Allow-Origin", "*")
    res.status(err.status || 500).json({
       error: {
            message: err.message || "endpoint not found",
            statusCode: err.status || 500,
            redirect: true,
            to: process.env.HOST
       }
    })
}


module.exports = app;