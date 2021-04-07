(function connect(){
    let socket = io()

    let DOMElements = {
        username: document.querySelector('#username'),
        usernameBtn: document.querySelector('#usernameBtn'),
        curUsername: document.querySelector('.card-header'),
        messageList: document.querySelector('#message-list'),
        message: document.querySelector('#message'),
        messageBtn: document.querySelector('#messageBtn'),
        info: document.querySelector('.info')
    }

    
    function setUsername(){
        if (DOMElements.username.value != null && DOMElements.username.value != ''){
            socket.emit('change_username', {username: DOMElements.username.value})
            DOMElements.curUsername.innerHTML = '<b>Your username:</b> ' + DOMElements.username.value
            DOMElements.username.value = ''
        }else{
            alert('Error! Username field can not be empty!')
        }
    }

    DOMElements.username.addEventListener('keyup', e =>{
        if(e.keyCode === 13){
            setUsername()
        }
    })

    DOMElements.usernameBtn.addEventListener('click', e => {
        setUsername()
    })
    
    function sendMessage(){
        if(DOMElements.message.value != null && DOMElements.message.value != '') {
            socket.emit('new_message', {message: DOMElements.message.value})
            DOMElements.message.value = ''
        }else{
            alert('Error! Message field can not be empty!')
        }
    }

    DOMElements.message.addEventListener('keypress', e => {
        if(e.key === 'Enter'){
            sendMessage()
        }
    })

    DOMElements.messageBtn.addEventListener('click', e => {
        sendMessage()
    })

    socket.on('receive_message', data => {
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ': ' + data.message
        listItem.classList.add('list-group-item')
        DOMElements.messageList.appendChild(listItem)
    })

    DOMElements.message.addEventListener('keypress', e =>{
        socket.emit('typing')
    })

    socket.on('typing', data=>{
        DOMElements.info.textContent = data.username + ' is typing...'
        setTimeout(()=>{
            DOMElements.info.textContent=''
        }, 5000)
    })
})()
