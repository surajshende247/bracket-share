import React from 'react';

import './Home.css';

import imgBoy from './../../assets/img/img-boy.png';
import imgGirl from './../../assets/img/img-girl.png';

function Home() {
    return (
        <div>
            <div className="row">
                <div className="col-md-8 d-md-flex flex-row justify-content-evenly">
                    <div className="card-room-entry">
                        <h2 className="text-center">Join Room</h2>
                        <img src={imgGirl} className="img-fluid mx-auto d-block img-room-entry"/>
                        <form>
                            <input className="form-control mt-2" type="text" placeholder="Your Name" />
                            <input className="form-control mt-2" type="text" placeholder="Room Code" />
                            <button type="button" className="btn btn-warning w-100 mt-3">Join Room</button>
                        </form>
                    </div>
                
                    <div className="card-room-entry">
                        <h2 className="text-center">Create Room</h2>
                        <img src={imgBoy} className="img-fluid mx-auto d-block img-room-entry"/>
                        <form>
                            <input className="form-control mt-5" type="text" placeholder="Your Name" />
                            <button type="button" className="btn btn-warning w-100 mt-3">Create Room</button>
                        </form>
                    </div>
                   
                    
                </div>
                <div className="col-md-4">
                    <h2>Bracket Share Information</h2>
                </div>
            </div>
        </div>
    )
}

export default Home
