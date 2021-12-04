import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';
import './PairProgramming.css'

const socket = io.connect();

function PairProgramming() { 
    const [codeSnippet, setCodeSnippet] = useState();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');
    
    const updateCodeSnippet = (e) => {
        e.preventDefault();
        setCodeSnippet(e.target.value);
        socket.emit('code-snippet', {codeSnippet: e.target.value, roomId: roomId});
    }

    const updateMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(message)
        {
            socket.emit('chat', {userName:userName ,message: message, roomId: roomId});
        }
        setMessage('');
    }


    useEffect(() => {
        socket.on('code-snippet', (payload) => {
            setCodeSnippet(payload.codeSnippet);
        })

        socket.on('chat', (payload) => {
            setChat([...chat, payload]);
        })
        
        let roomCode = localStorage.getItem("roomCode");
        if(roomCode){
            setRoomId(roomCode);
            socket.emit('room', {roomId: roomCode});
        }
        let userName = localStorage.getItem("userName");
        if(userName){
            setUserName(userName);
        }
    })

    return (
        <div className="container">
            <h1>Hello {userName}: [{roomId}]</h1>
          
            <div className="row">
                <div className="col-md-8">
                    <textarea 
                    className="codeEditor" 
                    placeholder="Pair Programming"
                    value={codeSnippet}
                    onChange={updateCodeSnippet}
                    >
                    </textarea>
                    </div>
                <div className="col-md-4 chat-window">
                    <div className="chat-container">                   
                        {
                            chat.map((chat, index) => {
                               return (
                                chat.userName===userName
                                ?
                                <div className="message left" key={index}>
                                    Me: {chat.message}
                                </div>
                                :
                                <div className="message right" key={index}>
                                    {chat.userName} : {chat.message}
                                </div>
                               )
                            })
                        }                       
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control"
                         placeholder="Type your message here..." 
                         value={message}
                         onChange={updateMessage}/>
                        <div class="input-group-append">
                            <span class="input-group-text" onClick={sendMessage}>Send</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default PairProgramming