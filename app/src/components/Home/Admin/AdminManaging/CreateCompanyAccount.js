import React, { useState } from 'react';
import axios from 'axios';

function CreateCompanyAccount() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: '',
    errorMessage: '',
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

  const userType = localStorage.getItem('userType');
  if (userType !== 'ADMIN'){
    return (
      <p>You are not allowed to visit this page.</p>
    );
  }

  return (
    <div>
      <h2 className='JobListingWordContainer'>Create Company Account</h2>
      <form className='FormContainer' onSubmit={handleSubmit}>
        <div className='EditJobContainer'>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Username:</label>
            <input className='EditProfileInputBlock' type="text" name="username" value={formState.username} onChange={handleChange} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Email:</label>
            <input className='EditProfileInputBlock' type="email" name="email" value={formState.email} onChange={handleChange} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Password:</label>
            <input className='EditProfileInputBlock' type="password" name="password" value={formState.password} onChange={handleChange} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Confirm Password:</label>
            <input className='EditProfileInputBlock' type="password" name="confirmPassword" value={formState.confirmPassword} onChange={handleChange} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>First Name:</label>
            <input className='EditProfileInputBlock' type="text" name="firstName" value={formState.firstName} onChange={handleChange} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Last Name:</label>
            <input className='EditProfileInputBlock' type="text" name="lastName" value={formState.lastName} onChange={handleChange} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>User Type:</label>
            <select className='EditProfileInputBlock' name="userType" value={formState.userType} onChange={handleChange}>
              <option value="">--Select User Type--</option>
              <option value="ADMIN">ADMIN</option>
              <option value="HEADHUNTER">HEADHUNTER</option>
            </select>
          </div>
        </div>
        <div className='ShowNotificationButton AdminCreateButton'>
          <button className='JobApplicationButtons' type="submit">Create Account</button>
          {formState.errorMessage && <p>{formState.errorMessage}</p>}
          {formState.successMessage && <p>{formState.successMessage}</p>}
        </div>
      </form>
    </div>
  );
}

export default CreateCompanyAccount;