import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';
import './PairProgramming.css'

import icoDone from './../../assets/chat-stickers/ico-done.svg'
import icoLike from './../../assets/chat-stickers/ico-like.svg'
import icoReset from './../../assets/chat-stickers/ico-reset.svg'
import icoTrophy from './../../assets/chat-stickers/ico-trophy.svg'

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

    const sendSticker = (e) => {
        e.preventDefault();
        socket.emit('chat', {userName:userName ,message: e.target.name, roomId: roomId});
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

    function renderSticker(message) {
        switch (message) {
            case 'ico-done':
                return <img src={icoDone} alt="done" className="chat-message-sticker" />
            case 'ico-like':
                return <img src={icoLike} alt="like" className="chat-message-sticker" />
            case 'ico-reset':
                return <img src={icoReset} alt="reset" className="chat-message-sticker" />
            case 'ico-trophy':
                return <img src={icoTrophy} alt="trophy" className="chat-message-sticker" />
            default:
                return null;
        }
    }

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
                              
                                const  chatUser = chat.userName === userName ? 'Me' : chat.userName;
                                const chatAlign = chat.userName === userName ? 'right' : 'left';

                               return (
                                chat.message.startsWith('ico-') 
                                ?
                                 <div className={`message-sticker ${chatAlign}`} key={index}>
                                     {chatUser}:<br /> {renderSticker(chat.message)}
                                 </div>
                                :
                                <div className={`message ${chatAlign}`} key={index}>
                                    {chatUser} :<br /> {chat.message}
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

                        <div className="d-flex justify-content-around">
                            <img src={icoDone} alt="done" className="chat-sticker" name="ico-done" onClick={sendSticker}/>
                            <img src={icoLike} alt="done" className="chat-sticker" name="ico-like" onClick={sendSticker}/>
                            <img src={icoReset} alt="done" className="chat-sticker" name="ico-reset"  onClick={sendSticker}/>
                            <img src={icoTrophy} alt="done" className="chat-sticker" name="ico-trophy" onClick={sendSticker}/>
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export default PairProgramming