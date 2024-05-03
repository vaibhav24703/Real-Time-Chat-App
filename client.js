const socket = io('http://localhost:8000')

// get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// audio that will play on recieving messages
var audio = new Audio('ting.mp3');

// function which will append event info to container
const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left') {
        audio.play();
    }
}
// ask new user for name
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)
// if new user joins, recieve his/her name from server
socket.on('user-joined', data=>{
    append(`${name} joined the chat`, 'right')
})
// if server send message, recieve it
socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})
// if any user leaves chat, append info to container
socket.on('left', name=>{
    append(`${data.name} left the chat`, 'right')
})
// if form gets submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.nodeValue;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})