require('dotenv').config()
const express = require('express')
const myroutes = require('./routes')
const bodyParser = require('body-parser')
const myroutes2 = require('./userroutes')

const app = express()
const port = process.env.PORT || 5000

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","OPTIONS, GET, POST, PUT, DELETE")
    next()
})


app.use('/users', myroutes2)
app.use('/thisapp', myroutes)
app.use((req, res, next) => {
    console.log('Time:', new Date + (3600000*-5.0)) // GMT-->EST
    next()
})


//app.use(express.static('public'))

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.get('/',(req,res,next) => {
//     next(new Error('Something went wrong :-('))
// })
app.use((err, req, res, next) => {
// Do logging and user-friendly error message display
    console.error(err)
    res.status(500).send('internal server error')
})

app.listen(port, () => {
    console.log(`listening on port ${ port }`)
})