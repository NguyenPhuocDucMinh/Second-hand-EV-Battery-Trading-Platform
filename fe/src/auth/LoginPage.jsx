import React from 'react'
import '../assets/css/LoginPage.css';
import { Link } from "react-router-dom";
const LoginPage = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                </div>
                <div className='remember-forget'>
                    <label>
                        <input type="checkbox" /> Remember Me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type='submit'>Login</button>
                <div className='register-link'>
                    <p>Register an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
