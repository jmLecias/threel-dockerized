import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import AuthenticationService from '../services/AuthenticationService';

function Player() {
    const navigate = useNavigate();
    const auth = new AuthenticationService();
    const { logout, user } = useAuth();

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        toast.info("Logged out", {
            autoClose:  1000,
            pauseOnHover: true,
        });
    }
    const handleMe = (event) => {
        event.preventDefault();
        const name = JSON.parse(auth.getUser()).original.name;
        toast.info("Hello! You are "+name, {
            position: "bottom-right",
            autoClose:  1000,
            pauseOnHover: true,
        });
    }
    return (
        <div className="App" >
            <ToastContainer />
            <header>
                <div className="header-logo">
                    <div>
                        <img className="menu" src="images/icon-menu.png" alt="menu" />
                    </div>
                    <h1>THREEL</h1>
                </div>

                <div className="header-actions mx-auto my-auto">
                    <h1 className="username-actions">{JSON.parse(auth.getUser()).original.name}</h1>
                    <div className="user-dropdown">
                        {/* <ul>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul> */}
                    </div>
                    <button className="registerButton" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="registerButton" onClick={handleMe}>
                        Who am I?
                    </button>
                </div>
            </header>

            {/* <nav>
                <div className="btn-explore">
                    <div style={{ marginRight: '15px', marginTop: '5px' }}>
                        <img src="images/icon-trending.png" alt="icon-explore" />
                    </div>
                    <a style={{ padding: '0px', fontSize: '20px', fontWeight: 'bold' }} href="#">EXPLORE</a>
                </div>
                <br />
                <ul>
                    <li><a href="#">My Playlist</a></li>
                    <li><a href="#">Podcasts</a></li>
                    <li><a href="#">Videocasts</a></li>
                    <li><a href="#">Songs</a></li>
                    <li><a href="#">Profile</a></li>
                </ul>
            </nav> */}

            {/* <main>
                <div className="media-player">
                    <video width="100%" height="100%" style={{ borderRadius: '10px' }} controls autoPlay>
                        <source src="videos/AquaintanceIntroVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="controls-container">
                    <div className="media-progress">
                        <h1 className="time-progress time-text">
                            00:00
                        </h1>
                        <div className="progress-bar">
                            <div className="progress-buffer"></div>
                            <div className="progress-current"></div>
                        </div>
                        <h1 className="time-length time-text">
                            00:00
                        </h1>
                    </div>
                    <div className="controls">
                        <div className="left-controls">
                            <img className="control-button" src="images/icon-fullscreen.png" alt="fullscreen" />
                        </div>
                        <div className="main-controls">
                            <img className="control-button" style={{ transform: 'rotate(180deg)' }} src="images/icon-next.png" alt="next" />
                            <img className="control-button btn-play" src="images/icon-play.png" alt="play" />
                            <img className="control-button" src="images/icon-next.png" alt="next" />
                        </div>
                        <div className="right-controls">
                            <img className="control-button" src="images/icon-heart.png" alt="heart" />
                            <img className="control-button" src="images/icon-donate.png" alt="donate" />
                        </div>
                    </div>
                </div>
            </main>

            <aside>
                <div>
                    <h1 style={{ fontSize: '30px' }}>TITLE</h1>
                    <h3 style={{ fontSize: '18px', fontWeight: 'normal' }}>Owner</h3>
                </div>
                <div className="desc-container">
                    <h2 style={{ fontSize: '20px' }}>DESCRIPTION</h2>
                    <p style={{ fontWeight: 'normal', fontSize: '15px' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </aside> */}
        </div>
    );
}

export default Player;
