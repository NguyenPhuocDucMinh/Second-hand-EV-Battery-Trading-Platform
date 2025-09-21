import React from 'react'
import '../assets/css/LoginPage.css';
const RegisterPage = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder='Email' required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Confirm Password' required />
                </div>
                
                <button type='submit'>Register</button>
                
            </form>
        </div>
    );
};

export default RegisterPage;
