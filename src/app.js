const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const cors = require('cors')
const spotifyRoutes = require('./routes/index')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUsersInRoom, getUser, removeRoom } = require('./utils/users')
const request = require('request')
const morgan = require('morgan')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3001

app.use(cors())
app.use(morgan('combined'))

const cookieParser = require('cookie-parser');




app.use(express.json())
app.use(spotifyRoutes)

io.on('connection', (socket)=>{


    console.log('Connected!')
    //broadcast emits everyone but one particular connection
    //to method lets us target a specific room
   

    socket.on('join', ({username, room})=>{
        //Sends event to a particfular room
  
        const {error, user} = addUser({ id: socket.id, username,room})


        //Might want to change to emit to send message!
        if(error){
            return console.log(error)
        }

        socket.join(user.room)

        //io.to.emit, emits message to a particular room
        //socket.broadcast.to.emit, like socket.broadcast but to a specific room only
        socket.broadcast.to('162').emit('message', generateMessage('Admin',`${user.username} has joined!`))
        socket.emit('message', generateMessage('Admin','Welcome!'))      
    })

    socket.on('sendMessage', (message)=>{
        console.log('Message: ',message)
        console.log(socket.id)
        const user  = getUser(socket.id)

        io.to(user.room).emit('message',generateMessage(user.username,message))
        
    })

    socket.on('disconnect', () =>{
         const user = removeUser(socket.id)
        // const delRoom = removeRoom(user.room)

        if(user){
            io.emit('message', generateMessage('admin',`${user.username} has Left!`))
        }
    })
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})