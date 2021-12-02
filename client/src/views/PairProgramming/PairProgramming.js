import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';
import './PairProgramming.css'

const socket = io.connect('192.168.121.95:5000');

function PairProgramming() { 
    const [codeSnippet, setCodeSnippet] = useState();
    const [roomId, setRoomId] = useState('');
    
    const updateCodeSnippet = (e) => {
        e.preventDefault();
        setCodeSnippet(e.target.value);
        socket.emit('chat', {codeSnippet: e.target.value, roomId: roomId});
    }

    const joinRoom = (e) => {
        e.preventDefault();
        socket.emit('room', {roomId: roomId});
    }

     
        

    useEffect(() => {
        socket.on('chat', (payload) => {
            setCodeSnippet(payload.codeSnippet);
        })

    })

    return (
        <div>
            <h1>Pair Programming: ({roomId})</h1>
          
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
                <div className="col-md-4">
                    <input type="text" className="form-control" value={roomId} onChange={(e)=>{setRoomId(e.target.value)}} placeholder="Room Code" />
                    <button className="btn btn-primary"  onClick={joinRoom} >Send</button>
                </div>
                
            </div>
        </div>
    )
}

export default PairProgramming