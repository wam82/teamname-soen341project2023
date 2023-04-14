import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css'
import Header from '../Header/Header';


//handles login
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();


  //when user comes to this page, localStorage is cleared, preventing access to any other page
  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('mode');
  }, []);

  //handle login. Sets userId, userType and isLoggedIn in the localStorage
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log(response.data);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userType', response.data.user_type);
      history.push('/');
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    }
  };

  //ask for email and password

  return (
    <d>
      <div style={{ height: '70px' }}>
        <Header />
      </div>
      <div className="login-page-container">
        <h1 className="login-header">Welcome to <br/>HiredIn</h1>
        <form onSubmit={handleLogin}>
          <div className='login-function-container'>
            <input className="login-input-boxes" type="text" name="email" placeholder= "Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="login-input-boxes" type="password" name="password" placeholder= "Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="login-input-boxes main-sign-in-button" type="submit">Login</button>
            {error && <p>{error}</p>}
          </div>
        </form>
        <div className="login-page-background">
        </div>
      </div>
    </d>
  );
}

export default Login;
