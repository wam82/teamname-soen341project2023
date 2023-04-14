import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';

function Register() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: '',
    errorMessage: '',
    successMessage: '',
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        !formState.username ||
        !formState.email ||
        !formState.password ||
        !formState.confirmPassword ||
        !formState.firstName ||
        !formState.lastName ||
        !formState.userType
      ) {
        setFormState({ ...formState, errorMessage: 'Please fill in all fields' });
        return;
      }
  
      if (formState.password !== formState.confirmPassword) {
        setFormState({ ...formState, errorMessage: 'Passwords do not match' });
        return;
      }
  
      const response = await axios.post('http://localhost:5000/register', formState);
      setFormState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        userType: '',
        errorMessage: '',
        successMessage: response.data.message
      });
      setTimeout(() => {
        setFormState({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          userType: '',
          errorMessage: '',
          successMessage: '',
        });
      }, 5000);
    } catch (error) {
      console.error(error);
      setFormState({ ...formState, errorMessage: error.response.data.message });
    }
  };
  
  return (
    <div>
      <div style={{ height: '70px' }}>
        <Header />
      </div>
      <div className="login-page-container">
        <h1 className="login-header">Welcome to <br/>HiredIn</h1>
        <form onSubmit={handleSubmit}>
          <div className='login-function-container'>
              <input className="login-input-boxes" type="text" name="username" placeholder="Username" value={formState.username} onChange={handleChange} />
              <input className="login-input-boxes" type="email" name="email" placeholder="Email" value={formState.email} onChange={handleChange} />
              <input className="login-input-boxes" type="password" name="password" placeholder="Password" value={formState.password} onChange={handleChange} />
              <input className="login-input-boxes" type="password" name="confirmPassword" placeholder="Confirm Password" value={formState.confirmPassword} onChange={handleChange} />
              <input className="login-input-boxes" type="text" name="firstName" placeholder="First Name" value={formState.firstName} onChange={handleChange} />
              <input className="login-input-boxes" type="text" name="lastName" placeholder="Last Name" value={formState.lastName} onChange={handleChange} />
              <select className="login-input-boxes" name="userType" value={formState.userType} onChange={handleChange}>
                <option value="">--Select User Type--</option>
                <option value="EMPLOYER">Employer</option>
                <option value="STUDENT">Student</option>
              </select>
            <button className="login-input-boxes main-sign-in-button" type="submit">Register</button>
          </div>
          {formState.errorMessage && <p>{formState.errorMessage}</p>}
          {formState.successMessage && <p>{formState.successMessage}</p>}
        </form>
        <div className="login-page-background">
        </div>
      </div>
    </div>
  );
}

export default Register;