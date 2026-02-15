import React, { useState } from 'react';
import './login.css';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';

const Login = () => {
    const [activeTab, setActiveTab] = useState<'signUp' | 'login'>('signUp');

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="text">
                    {activeTab === 'signUp' ? 'Sign up' : 'Login'}
                </div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <FiUser className="m-4" />
                    <input type="text" placeholder="Username" />
                </div>
                <div className="input">
                    <FiMail className="m-4" />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <FiLock className="m-4" />
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                    />
                </div>
            </div>
            <div className="submit-container">
                <div
                    className={
                        activeTab === 'signUp'
                            ? 'submit-button'
                            : 'submit-button change'
                    }
                    onClick={() => setActiveTab('signUp')}
                >
                    Sign Up
                </div>
                <div
                    className={
                        activeTab === 'login'
                            ? 'submit-button'
                            : 'submit-button change'
                    }
                    onClick={() => setActiveTab('login')}
                >
                    Login
                </div>
            </div>
        </div>
    );
};

export default Login;
