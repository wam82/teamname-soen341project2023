import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';
import axios from 'axios';
import './SideBar.css';

function SideBar({ mode, toggleMode }) {
  const [setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="SideBarContainer">
      <div className='ProfileContainer'>
        <Profile />
        <Link className='SideBarLinks br' to='/notifications'><button className='SideBarButtons'>Notification</button></Link>
        <Link className='SideBarLinks' to='/people'><button className='SideBarButtons'>Find people</button></Link>
      </div>
      <div className='GeneralStuffContainer'>
        <Link className='SideBarLinks' to='/'><button className='SideBarButtons'>Home</button></Link>
        <button className='SideBarButtons' onClick={toggleMode}>{mode === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
        <Link className='SideBarLinks' to='/login'><button className='SideBarButtons'>Logout</button></Link>
      </div>
    </div>
  );
}

export default SideBar;
