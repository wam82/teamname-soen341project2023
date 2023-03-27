import React, { useState } from "react";
import { createClient } from '@supabase/supabase-js';

const database = createClient('https://woqpnszxdqmdgcyicfgc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcXBuc3p4ZHFtZGdjeWljZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MDI3MzAsImV4cCI6MTk5MzE3ODczMH0.6P8xHjbJ1B3S6fZRyP-p51_CoGK7SRGsJVugwxs2hB4')


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

const addUserToDatabase = async (email, password, userName, firstName, lastName) => {
  const { data, error } = await database.from('users').insert([{ email, password, userName, firstName, lastName }]);

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}
    const handleSubmit = (e) => {
  e.preventDefault();
  if (!checkPasswordMatch()) {
    return;
  }
  addUserToDatabase(email, pass, userName, firstName, lastName);
}

   // const handleSubmit = (e) => {
    //    e.preventDefault();
      //  console.log(email);
    //}

    const checkPasswordMatch = () => {
        return pass === confirmPass;
    }

    return (
        <div className="register-page-container">
            <div className="auth-form-container">
            <h1 class="register-useless-text"> Get Started <br/> to Find Your Dream Job</h1>
                <h2 className="top">Register </h2>

                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="occupation">Please choose your occupation</label>
                    <select id="mySelect">
                        <option>Student</option>
                        <option>Employer</option>
                    </select>
                    <label htmlFor="userName">User Name</label>
                    <input value={userName} name="userName" onChange={(e) => setUserName(e.target.value)} id="userName" placeholder="User Name" />
                    <label htmlFor="firstName">First Name</label>
                    <input value={firstName} name="firstName" onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name" />
                    <label htmlFor="lastName">Last Name</label>
                    <input value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name" />
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="********" id="confirmPassword" name="confirmPassword" />
                    {!checkPasswordMatch() && <p className="error-message">Passwords do not match</p>}
                    <button type="submit">Sign Up</button>
                </form>
      
                <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
            </div>

             <div class="register-page-background">
      </div>
        </div>
    )
}
