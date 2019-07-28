const users = []


const addUser = ({id,username,room}) => {
    //clean the data
    username= username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //vaalidate data
    if(!username || !room){
        return({
            error: 'username and room are requried'
        })
    }

    //check for existing user
    const existingUser = users.find((user)=>{
        return user.room ===room && user.username ===username 
    })

    //validate username
    if(existingUser){
        return {
            error: 'Username is in use'
        }
    }

    //store user
    const user = {id,username,room}
    users.push(user)
    return({undefined,user})
    
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if (index !== -1){
        const removedUser = users[index]
        users.splice(index,1)
        return removedUser
    }
    return undefined


}

const getUser = (id) =>{
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if (index === -1){
        return undefined
    }

    return users[index]
}

const getUsersInRoom = (room) =>{
   return users.filter((user)=>{
        return user.room === room
    })

}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

