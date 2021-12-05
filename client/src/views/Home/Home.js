import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';

import imgBoy from './../../assets/img/img-boy.png';
import imgGirl from './../../assets/img/img-girl.png';

function Home() {
    let navigate = useNavigate();

    const [roomData, setRoomData] = useState({
            userName: '',
            roomCode: ''
    });

    const joinRoom = (e) =>{
        localStorage.setItem("userName",roomData.userName);
        localStorage.setItem("roomCode",roomData.roomCode);
        navigate('/pairprogramming');        
    }

    const createRoom = (e) =>{
        localStorage.setItem("userName",roomData.userName);
        const roomCode = roomData.userName.substring(0,3).toUpperCase() + Math.floor(Math.random() * 10)+ (new Date().getUTCMinutes());
        localStorage.setItem("roomCode",roomCode);
        navigate('/pairprogramming');
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-8 d-md-flex flex-row justify-content-evenly">
                    <div className="card-room-entry">
                        <h2 className="text-center">Join Room</h2>
                        <img src={imgGirl} className="img-fluid mx-auto d-block img-room-entry"/>
                        <form onSubmit={joinRoom}>
                            
                            <input className="form-control mt-2" 
                            type="text" 
                            placeholder="Your Name" 
                            value={roomData.userName}
                            onChange={(e) => setRoomData({...roomData, userName: e.target.value})}
                            required />

                            <input className="form-control mt-2" 
                            type="text" 
                            placeholder="Room Code" 
                            value={roomData.roomCode}
                            onChange={(e) => setRoomData({...roomData, roomCode: e.target.value})}
                            required/>
                            <button type="submit" className="btn btn-warning w-100 mt-3">Join Room</button>
                        </form>
                    </div>
                
                    <div className="card-room-entry">
                        <h2 className="text-center">Create Room</h2>
                        <img src={imgBoy} className="img-fluid mx-auto d-block img-room-entry"/>
                        <form onSubmit={createRoom}>
                            <input className="form-control mt-5" 
                            type="text" 
                            placeholder="Your Name"
                            value={roomData.userName}
                            onChange={(e) => setRoomData({...roomData, userName: e.target.value})}
                            required/>
                            <button type="submit" className="btn btn-warning w-100 mt-3">Create Room</button>
                        </form>
                    </div>
                   
                    
                </div>
                <div className="col-md-4">
                    <h2>Bracket Share Information</h2>
                </div>
            </div>
            <div className="d-flex flex-row d-flex justify-content-around">
                <a href="https://github.com/surajshende247/bracket-share" target="_blank" className="btn btn-lg btn-dark  mt-3"> View Source Code on Github <i className="fa fa-github"></i></a>
                <a href="https://github.com/surajshende247/bracket-share/issues/new" target="_blank" className="btn btn-lg btn-danger  mt-3"> Report Bug <i className="fa fa-bug"></i></a>
            </div>
            <footer className="footer">
                <div className="container text-center">
                    Made With ❤️ by <a href="https://github.com/surajshende247">Suraj Shende</a> 
                </div>
            </footer>
        </div>
    )
}

export default Home
