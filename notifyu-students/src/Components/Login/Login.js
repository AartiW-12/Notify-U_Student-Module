import React, { useState } from 'react'
import './Login.css';
import axios from 'axios'

export default function Login({ onLogin }) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const showMsg = (msg) => {
        document.getElementById("loginMsg").innerHTML = msg;
        setTimeout(() => {
            document.getElementById("loginMsg").innerHTML = "";
        }, 1500);
    }

    const handleLogin = async () => {

        if (userName === "" || password === "") {
            showMsg("Incomplete Data!");
            return; 
        }

        try {
            const response = await axios.post('http://localhost:5001/api/studentLogin', { userName, password });

            if (response.data.success) {
                onLogin(userName);
            } else {
                showMsg("Invalid Login Credentials!");
            }

        } catch (error) {
            console.log(error);
            showMsg("Server error. Please try again.");
        }
    };

    const handleClear = () => {
        setUserName('');
        setPassword('');
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") handleLogin();
    }

    return (
        <>
            <div className="loginParent">
                <div className='loginBG'>
                    <div className="loginContainer">
                        <div className="LoginText"><b>NotifyU</b></div>

                        <div className='usernameBg'>
                            <input className='username'
                                type='text'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder='PRN'
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <br />
                        <div className='passwordBg'>
                            <input className='password'
                                type='date'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    console.log(e.target.value);
                                    }}
                                onKeyDown={handleEnter}
                            />
                        </div>

                        <div className="loginMsg" id='loginMsg'></div>
                        <br />

                        <div className='loginBg'>
                            <div className="clearBtn" onClick={handleClear}>Clear</div>
                            <div className="loginBtn" onClick={handleLogin}>Login</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}