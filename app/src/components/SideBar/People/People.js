import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import profilePicture from '../Profile/222.jpg';

//Shows list of ALL users
//Shows list of ALL users
function People() {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/people');
        const filteredUsers = response.data.filter(user => user.id !== userId);
        setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [userId]);

  const PeopleProfilePicture = ({ userId }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
      loadImage().then((src) => setImageSrc(src));
    }, []);

    const loadImage = () => {
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

    return <img className='PeopleProfilePicture' src={imageSrc} alt='User Profile' width='50' height='50' />;
  };

  //maps users
  return (
    <div>
      <h2 className='JobListingWordContainer'>People</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link className='ButtonStyleLinks' to={`/people/${user.id}`}>
                <div className='SinglePersonContainer'>
                  <PeopleProfilePicture userId={user.id} />
                  <div className='NameAndTypeContainer'>
                    <div className='UserType'>
                      <p>{user.user_type}</p>
                    </div>
                    <h4 className='UserName'>Name: {user.firstName} {user.lastName}</h4>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default People;
