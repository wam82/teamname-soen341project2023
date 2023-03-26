import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className = "register-page-container">

        
        <div className="auth-form-container">

           <h2 className="top">Register </h2>

        <form className="register-form" onSubmit={handleSubmit}>

        <label htmlFor="occupation" >Please choose your occupation</label>

            <select id="mySelect">
            
   
            <option>Student</option>
            <option>Employer</option>
            </select>
 
            <label htmlFor="name" >User Name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="userName" placeholder="User Name" />
            <label htmlFor="name" >First Name</label>
            <input value={name} name="First Name" onChange={(e) => setName(e.target.value)} id="firstName" placeholder="First Name" />
            <label htmlFor="name" >Last Name</label>
            <input value={name} name="Last Name" onChange={(e) => setName(e.target.value)} id="lastName" placeholder="Last Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Confirm password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Sign Up</button>
        </form>
      
         <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>

    </div>
    )
}