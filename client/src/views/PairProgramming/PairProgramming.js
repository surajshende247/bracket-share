import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './PairProgramming.css'
import toast, { Toaster } from 'react-hot-toast';

import icoDone from './../../assets/chat-stickers/ico-done.svg'
import icoLike from './../../assets/chat-stickers/ico-like.svg'
import icoReset from './../../assets/chat-stickers/ico-reset.svg'
import icoTrophy from './../../assets/chat-stickers/ico-trophy.svg'

import logo from './../../assets/img/logo.svg';

const socket = io.connect();


function PairProgramming() {
    let navigate = useNavigate();

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
        navigator.clipboard.writeText(`Hey...! Join me on Bracket Share. I am waiting for you. https://bracket-share.roadtocode.org  Room ID: ${roomId}`);
        toast.success('Invite link copied to clipboard');
    }

    useEffect(() => {
        socket.on('code-snippet', (payload) => {
            setCodeSnippet(payload.codeSnippet);
        })

        socket.on('chat', (payload) => {
            setChat([...chat, payload]);
            scrollChatBottom();
        })

        function isPresent(arr,user) {
            return (arr.indexOf(user) != -1);
        }

        socket.on('room', (payload) => {
           /* if(!isPresent(roomMembers, payload.userName))
            {
                toast.success(`${payload.userName} has joined the room, ${payload.roomId}`);
                setRoomMembers([...roomMembers, payload.userName]);
            }*/
        })
        
        const roomCode = localStorage.getItem("roomCode");
        const userName = localStorage.getItem("userName");
        
        setRoomId(roomCode);
        setUserName(userName);
        if(roomCode!=null && userName!=null)
        {
            socket.emit('room', {roomId: roomCode, userName: userName});
        }
        else{
            alert('Invalid Room... Kindly Create new room');
            navigate('/');
        }
    })

    function scrollChatBottom() {
        const chatBox = document.getElementById('chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }

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
        }
        scrollChatBottom();
    }

    return (
        <div className="container">
            <div className="meeting-info d-flex flex-row d-flex justify-content-between">
                <div className="p-2">
                    <h3 className="title"><img src={logo} className="img-fluid" />Bracket Share</h3>
                </div>
                <div className="p-2">
                    <h2>Hello,  {userName}</h2>
                </div>
                <div className="p-2">
                    <h4>Room ID: {roomId}</h4>
                    <a href="#" className="btn btn-secondary" onClick={copyInviteLink}>Copy invite link{" "} <i class="far fa-copy"></i></a>
                </div>
                <Toaster
                position="top-right"
                reverseOrder={false} />
            </div>
          
            <div className="row">
                <div className="col-md-8">
                    <textarea 
                    className="codeEditor" 
                    placeholder="Write your code here... This code syncs with all other members in this room"
                    value={codeSnippet}
                    onChange={updateCodeSnippet}
                    >
                    </textarea>
                    </div>
                <div className="col-md-4 chat-window">
                    <h3 className="text-center title p-1 text-dark">Chat Window</h3>
                    <div className="chat-container" id="chat-box">                   
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
                            
                                <button type="submit" className="btn-send-message d-flex d-inline justify-content-center align-self-center" onClick={sendMessage}><i class="far fa-paper-plane"></i></button>
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