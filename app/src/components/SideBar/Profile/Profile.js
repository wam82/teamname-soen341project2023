import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import profilePicture from './222.jpg';
import './Profile.css'

//How profile looks in sidebar
function Profile() {
  const [user, setUser] = useState(null);
  const [imageSrc, setImageSrc] = useState('');


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

  useEffect(() => {
    loadImage().then((src) => setImageSrc(src));
  }, []);

  const loadImage = () => {
    const userId = localStorage.getItem('userId');
    const url = `https://xscgcgyexmdnddmzfhhk.supabase.co/storage/v1/object/public/images/images/${userId}.png?dummy=${new Date()}`;
    return new Promise((resolve) => {
      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            resolve(url);
          } else {
            resolve(profilePicture);
          }
        })
        .catch(() => {
          resolve(profilePicture);
        });
    });
  };
  

  //link to edit profile
  //profile image and name
  return (
    <div>
      {user ? (
        <div className='ProfileContainer'>
          <Link className='ProfileLinks' to="/edit-profile"><button className='ProfileButtons'>{`${user.firstName}, ${user.lastName}`}</button></Link>
          <Link className='ProfileLinks' to="/edit-profile"><img className='ProfilePicture' src={imageSrc} alt="User Profile" width="200" height="200" /></Link>
          <Link className='ProfileLinks' to="/edit-profile"><button className='ProfileButtons'>Edit Profile</button></Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
