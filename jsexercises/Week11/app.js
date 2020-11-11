// library modules
require('dotenv').config()
const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const port = process.env.PORT || 5150
require('dotenv').config()

let app = express()
let server = http.createServer(app)
let io = socketIO(server)

const moment = require('moment')
const matColors = require('./matdesigncolors.json')

var users = {}

let AdColor = "#2F4F4F"

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');
// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
app.use(function (req, res, next) {
    if (req.secure) {
// request was via https, so do no special handling
        next();
    } else {
// request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
});
app.use(express.static('public'))


io.on('connection', (socket) => {

    socket.on('join', (clientData) => {

        let coloridx = Math.floor(Math.random() * matColors.colors.length ) + 1

        if(Object.keys(users).includes(clientData.chatName)){
            io.to(socket.id).emit('nameexists', {})
        }else{

            users[clientData.chatName] = {}

            users[clientData.chatName]["id"] = socket.id
            users[clientData.chatName]["room"] = clientData.roomName
            users[clientData.chatName]["name"] = clientData.chatName
            users[clientData.chatName]["color"] = matColors.colors[coloridx]

            socket.join(clientData.roomName)

            io.to(socket.id).emit('welcome', {from : "Admin", room: clientData.roomName, text: `wellcome ${clientData.chatName}`, id: socket.id, color: AdColor, createdAt: moment().format('h:mm:ss a')})

            socket.broadcast.to(clientData.roomName).emit('joined', {from : "Admin", room: clientData.roomName, text: `${clientData.chatName} has joined`, id: socket.id, color: AdColor, createdAt: moment().format('h:mm:ss a')}) // send message to existing users in room

            console.log(`data from new client --> name: ${clientData.chatName} room: ${clientData.roomName}`)

            let rooms = ["Default"]

            Object.values(users).forEach(e=>{

                rooms.push(e.room);
            })


            let unique = [...new Set(rooms)];
            io.emit('currentrooms', unique)

            io.emit('currentusers', Object.values(users))

        }

    })
    socket.on('typing', (clientData) =>{

        let room = users[clientData.from].room
        socket.broadcast.to(room).emit('typing', clientData.from);

    })
    socket.on('createMessage', (clientData) =>{

        let josn = {from: clientData.from, room: users[clientData.from].room, text: clientData.text, id: socket.id, color: users[clientData.from].color , createdAt: moment().format('h:mm:ss a')}
        //io.emit('createMessage', josn)
        io.to(users[clientData.from].room).emit('createMessage', josn);
    })
    socket.on('disconnect', () => {

        let theName= "";
        Object.values(users).forEach(e=>{

            if(socket.id === e.id){
                socket.leave(socket.id)
                let josn = {from: "Admin", room: e.room, text: `${e.name} has left` , id: "", color: AdColor, createdAt: moment().format('h:mm:ss a')}
                io.to(users[e.name].room).emit('createMessage', josn)
                theName = e.name;
            }
        })
        delete users[theName];

    })


    room2s = ["Default"]
    Object.values(users).forEach(e=>{

        room2s.push(e.room);
    })
    let unique = [...new Set(room2s)];

    io.emit('currentrooms', unique)
    io.emit('currentusers', Object.values(users))

})

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname + '/public'})
})
server.listen(port, () => {
    console.log(`starting on port ${port}`)
})