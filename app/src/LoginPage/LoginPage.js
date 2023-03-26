import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Sending username ${username} and password ${password');

    try {
      const response = await axios.post('/api/login', {
        username: username,
        password: password
      });
      console.log(response.data);
      //TODO Handle successful login
    } catch (error) {
      console.error(error);
      //TODO Handle login error
    }
  };

  return (
    <div class="login-page-container">
      <div class="login-function-container">
        <h1 class="login-useless-text">Get Hired<br/>Jobs that matter</h1>

        
          <input class="login-input-boxes" type="text" name="input" placeholder="Email or phone number"/>
          <input class="login-input-boxes"type="password" name="pass" placeholder="Password"/>
          <a href="#" class="forgot-password-anchor">Forgot password?</a>
          <input class="login-input-boxes main-sign-in-button" type="button" value="Sign in"/>


      </div>
      
      <div class="login-page-background">
      </div>
    </div>
  )
}
