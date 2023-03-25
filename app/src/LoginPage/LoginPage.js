import React, { useState } from 'react';
import './LoginPage.css';
import api from '../api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    console.log('Submitting form successful. Waiting for response');
    event.preventDefault();
  
    try {
      const response = await api.post('/api/login', {
        username,
        password,
      });
  
      //Save loggedIn boolean and userType in local storage
      const loggedIn = response.data.loggedIn;
      const userType = response.data.userType;
      const email = response.data.email;
      localStorage.setItem('loggedIn', loggedIn);
      localStorage.setItem('userType', userType);
      localStorage.setItem('email', email);
      console.log('Login successful! loggedIn:', loggedIn, 'userType:', userType, 'email:' , email);
      // Handle post-login actions
    } catch (error) {
      //Handle login error
      console.error('Login error:', error);
    }
  }

  return (
    <div className="login-page-container">
      <form className="login-function-container" onSubmit={handleSubmit}>
        <h1 className="login-useless-text">Get Hired<br />Jobs that matter</h1>

        <input
          className="login-input-boxes"
          type="text"
          name="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input-boxes"
          type="password"
          name="pass"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#" className="forgot-password-anchor">Forgot password?</a>
        <button className="login-input-boxes main-sign-in-button" type="submit" value="Sign in">Sign in</button>
      </form>

      <div className="login-page-background">
      </div>
    </div>
  )
}
