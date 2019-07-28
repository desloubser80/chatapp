const generateMessage = (username,text) => {
    return {
        username,
        text,
        createdAt : new Date().getTime()
    }
}

const generateLocation = (username,locationUrl) =>{
    return {
        username,
        locationUrl,
        createdAt : new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocation
}