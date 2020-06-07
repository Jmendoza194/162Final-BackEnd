const users = []
const rooms = []

//addUser, removeUser,  getUser, getUsersInRoom

const addUser = ({ id, username, room}) =>{
    //Clean the data
    console.log(username)
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if(!username || !room){
        return{
            error: 'Username and room are required'
        }
    }
 
    //Check for existing user
    const existingUser = users.find((user) =>{
        return user.room === room && user.username === username
    })

    const existingRoom = rooms.find((newRoom) =>{
        return newRoom === room
    })

    //Validate username
    if(existingUser){
        return{
            error:'Username is in use!'
        }
    }

    // if(host && existingRoom){
    //     return{
    //         error: 'Cannot host an already existing room!'
    //     }
    // }

    // if(!host && !existingRoom){
    //     return{
    //         error:'Cannot join a non-existant room!'
    //     }
    // }

    //Store user
    const user = {id, username, room}
    console.log(user)
    users.push(user)
    if(!existingRoom){
        rooms.push(room)
    }
    
    return { user }
}

const removeUser = (id) =>{
    const index = users.findIndex((user) =>{
        return user.id === id
    })
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const removeRoom = (room) =>{
    const index = rooms.findIndex((existingRoom) =>{
        return room === existingRoom
    })
    if(index !== -1){
        return rooms.splice(index, 1)[0]
    }
}

const getUser = (id) =>{
    const index = users.findIndex((user)=>{
        return user.id === id
    })

    
    if(index !== -1){
        return users[index]
    }
}

const getRooms = () =>{
    return rooms;
}

const getUsersInRoom = (room) =>{
    return users.filter(user => user.room === room)
}


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getRooms,
    removeRoom
}
