import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';

import imgBoy from './../../assets/img/img-boy.png';
import imgGirl from './../../assets/img/img-girl.png';
import logo from './../../assets/img/logo.svg';

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
        <div className="home-container">
            <div className="p-2">
                                   
                <h1 className="text-center heading"><img src={logo} alt="logo" className="img-logo"/>Bracket Share</h1>
                            
                <h3 className="text-center sub-heading">
                    A <span className="text-success fw-bold">Realtime</span>, {" "}
                    <span className="text-primary fw-bold">Pair Programming</span>{" "} 
                    platform for live code discussion, technical interview with {" "}
                    <span className="text-danger fw-bold">Chat feature</span>.
                </h3>
            </div>

            <div className="row mt-3 mb-3">
                <div className="col-md-8 d-md-flex flex-row justify-content-evenly">
                    <div className="card-room-entry">
                        <h2 className="card-room-title text-center">Join Room</h2>
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
                            <button type="submit" className="btn-room-entry"><i class="fas fa-sign-in-alt"></i> Join Room</button>
                        </form>
                    </div>
                
                    <div className="card-room-entry">
                        <h2 className="card-room-title text-center">Create Room</h2>
                        <img src={imgBoy} className="img-fluid mx-auto d-block img-room-entry"/>
                        <form onSubmit={createRoom}>
                            <input className="form-control mt-5" 
                            type="text" 
                            placeholder="Your Name"
                            value={roomData.userName}
                            onChange={(e) => setRoomData({...roomData, userName: e.target.value})}
                            required/>
                            <button type="submit" className="btn-room-entry"><i class="fas fa-chalkboard"></i> Create Room</button>
                        </form>
                    </div>
                   
                    
                </div>
                <div className="col-md-4 d-flex flex-column justify-content-evenly">                                  
                    <h3>✅Realtime colaboration</h3>
                    <h3>✅Built from scratch</h3>
                    <h3>✅Light weighted</h3>                    
                    <h3>✅Chat with peers in the same room</h3>
                    <h3>✅No time limit</h3>
                    <h3>✅Unlimited room creation</h3>
                </div>
            </div>
            
            <footer className="footer">
            <div className="d-flex flex-row d-flex justify-content-end bg-light p-2">
                <a href="https://www.producthunt.com/posts/bracket-share?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bracket-share" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=322033&theme=light" alt="Bracket Share - Pair Programming Platform with Chat feature. | Product Hunt"  width="250" height="54" /></a>
                <a href="https://github.com/surajshende247/bracket-share" target="_blank" className="btn btn-lg btn-dark me-3 ms-3"> Github <i className="fa fa-github"></i></a>
            </div>
                <div className="footer-text container text-center">
                    Made With ❤️ by <a href="https://github.com/surajshende247">Suraj Shende</a> 
                </div>
            </footer>
        </div>
    )
}

export default Home
