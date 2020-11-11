
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const myroutes = require('./userroutes')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","OPTIONS, GET, POST, PUT, DELETE")
    next()
})

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log('Time:', new Date + (3600000*-5.0)) // GMT-->EST
    next()
})

app.use('/users', myroutes)


app.listen(port, () => {
    console.log(`listening on port ${ port }`)
})