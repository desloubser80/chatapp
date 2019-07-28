const socket = io()

//Elements
const $form =  document.querySelector('#form1')
const $messageFormInput = $form.querySelector('input')
const $submitButton = document.querySelector('#b1')
const $sendLocationButton = document.querySelector('#sendLocationButton')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const {username,room}= Qs.parse(location.search, {ignoreQueryPrefix:true})

const autoscroll = () =>{
    //new message element
    const $newMessage = $messages.lastElementChild

    //height of new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //visible height
    const visibleHeight = $messages.offsetHeight

    //height of messages
    const containerHeight = $messages.scrollHeights

    //how far have I scrolled
    const scrollOffset = messages.scrollTop + visibleHeight

    if(containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $message.ScrollHeight
    }

    console.log(newMessageMargin)


}

socket.on('message', (message)=>{
   
    const html = Mustache.render(messageTemplate,{
        username: message.username,
        message : message.text,
        createdAt : moment(message.createdAt).format("HH:mma")
    })
    $messages.insertAdjacentHTML('beforeEnd',html)
    autoscroll()
})

socket.on('locationMessage',(locationUrl)=>{
    console.log(locationUrl)
    const html = Mustache.render(locationTemplate,{
        username : locationUrl.username,
        locationUrl : locationUrl.locationUrl,
        createdAt : moment(locationUrl.createdAt).format("HH:mma")
    })
    $messages.insertAdjacentHTML('beforeEnd',html)
    autoscroll()
})

socket.on('roomData', ({room,users})=>{
    
    const html = Mustache.render(sidebarTemplate,{
        room,
        users
    })
    console.log(html)
    document.querySelector('#sidebar').innerHML = html
})

$form.addEventListener('submit', (e)=> {
    e.preventDefault()
    $submitButton.setAttribute('disabled','disabled')    
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (error)=>{
        $submitButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if(error){
            return console.log(error, "Message stopped")
        }
        console.log("Message has been delivered")
    })
})

$sendLocationButton.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('no geolocation')
    }

    $sendLocationButton.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        const lat = (position.coords.latitude)
        const long =(position.coords.longitude)
        socket.emit('sendLocation', {lat,long}, ()=>{
            $sendLocationButton.removeAttribute('disabled')
            console.log("Location has been shared")
        })
    })

    
})

socket.emit('join',{username,room}, (error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})
