import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';
import './PairProgramming.css'
import toast, { Toaster } from 'react-hot-toast';

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
    const [roomMembers, setRoomMembers] = useState([]);
    
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

    const copyInviteLink = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(`Hey...! Join me on Pair Programming. I am waiting for you. bracketshare.roadtocode.org  Room ID: ${roomId}`);
    }

    useEffect(() => {
        socket.on('code-snippet', (payload) => {
            setCodeSnippet(payload.codeSnippet);
        })

        socket.on('chat', (payload) => {
            setChat([...chat, payload]);
        })

        function isPresent(arr,user) {
            return (arr.indexOf(user) != -1);
        }

        socket.on('room', (payload) => {
            if(!isPresent(roomMembers, payload.userName))
            {
                toast.success(`${payload.userName} has joined the room, ${payload.roomId}`,{
                    toastId: 'room',
                });
                setRoomMembers([...roomMembers, payload.userName]);
            }
        })
        
        const roomCode = localStorage.getItem("roomCode");
        const userName = localStorage.getItem("userName");
        
        setRoomId(roomCode);
        setUserName(userName);
        socket.emit('room', {roomId: roomCode, userName: userName});
        
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
            <div className="meeting-info">
                <h2>Namaste 🙏,  {userName}</h2>
                <h4>Room ID: {roomId}</h4>
                <p onClick={copyInviteLink}>Click here to copy invite link</p>
                <Toaster
                position="top-right"
                reverseOrder={false} />
            </div>
          
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
                    <h3 className="text-center">Chat Window</h3>
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
                   
                        <form>
                            <div class="d-flex flex-row">
                            <input type="text" className="form-control d-flex d-inline"
                            placeholder="Type your message here..." 
                            value={message}
                            onChange={updateMessage}/>
                            
                                <button type="submit" className="btn btn-warning d-flex d-inline" onClick={sendMessage}>Send</button>
                                </div>
                        </form>
                    

                        <div className="d-flex justify-content-around container-stickers">
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