require('dotenv').config()
const express = require('express')
const socketIO = require('socket.io')
const app = express()
const http = require('http')
const port = process.env.PORT || 5000
let server = http.createServer(app)
let io = socketIO(server)
//app.get('/', (req, res) => res.send('<h1>Hello World From Express</h1>'))

let streetLights = [
    {streetName: 'Ma', green: 9000, red: 12000, yellow: 6000},
    {streetName: 'Chunhui', green: 13000, red: 18000, yellow: 6000},
    {streetName: 'Info3069', green: 10000, red: 15000, yellow: 5000},
    {streetName: 'Broadway', green: 10000, red: 7000, yellow: 3000}
]

app.use(express.static("public"))
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
// let getNumberOfUsersInRoom = (room) => io.nsps['/'].adapter.rooms[room].length
server.listen(port, () => console.log(`starting on port ${port}`))

