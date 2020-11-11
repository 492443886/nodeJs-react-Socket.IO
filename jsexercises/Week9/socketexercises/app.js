require('dotenv').config()
const express = require('express')
const socketIO = require('socket.io')
const app = express()
const http = require('http')
const port = process.env.PORT || 5000
let server = http.createServer(app)
let io = socketIO(server)
app.get('/', (req, res) => res.send('<h1>Hello World From Express</h1>'))

let streetLights = [
    {streetName: 'Maple', green: 12000, red: 7500, yellow: 4000},
    {streetName: 'Oak', green: 3000, red: 3000, yellow: 1000},
    {streetName: 'Main', green: 15000, red: 8000, yellow: 2000},
    {streetName: 'Broadway', green: 10000, red: 7000, yellow: 3000}
]

// main socket routine
io.on('connection', (socket) => {
    console.log('new connection established')
    socket.on('join', (dataFromClient) => {

        socket.name = dataFromClient.name

        socket.join(dataFromClient.name)

        let streetLight = streetLights.find( e => e.streetName === dataFromClient.name);

        console.log(`${socket.name} has joined ${dataFromClient.name}`)

        io.to(dataFromClient.name).emit('turnLampOn',streetLight);
    })
})
let getNumberOfUsersInRoom = (room) => io.nsps['/'].adapter.rooms[room].length
server.listen(port, () => console.log(`starting on port ${port}`))

