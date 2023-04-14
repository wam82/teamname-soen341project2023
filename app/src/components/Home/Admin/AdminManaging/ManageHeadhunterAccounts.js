import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//delete headhunter account, his job and job applications for his jobs
function ManageHeadhunterAccounts() {
  const [headhunters, setHeadhunters] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedHeadhunter, setSelectedHeadhunter] = useState(null);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/headhunters');
        setHeadhunters(response.data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-headhunter/${id}`);
      console.log(response.data);
      setHeadhunters(headhunters.filter((headhunter) => headhunter.id !== id));
      setShowConfirm(false);
      setSelectedHeadhunter(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (userType !== 'ADMIN') {
    return (
      <div>
        <h2>You are not allowed to view this page</h2>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className='JobListingWordContainer'>Manage Headhunter Accounts</h2>
      <table className='TableContainer'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {headhunters.map((headhunter) => (
            <React.Fragment key={headhunter.id}>
              <tr>
                <td>{headhunter.id}</td>
                <td>{headhunter.firstName} {headhunter.lastName}</td>
                <td>{headhunter.email}</td>
                <td>
                <div className='AdminManagingButtons'>
                  <button className='JobApplicationButtons' onClick={() => {
                    setShowConfirm(true);
                    setSelectedHeadhunter(headhunter);
                  }}>Delete</button>
                  <button className='JobApplicationButtons'><Link className='NotificationLinks' to={`/people/${headhunter.id}`}>View Profile</Link></button>
                </div>
                </td>
              </tr>
              {showConfirm && selectedHeadhunter === headhunter && (
                <tr>
                  <td colSpan="4">
                    <p>Are you sure you want to delete this account?</p>
                    <div className='AdminManagingButtons'>
                      <button className='JobApplicationButtons' onClick={() => handleDelete(selectedHeadhunter.id)}>Yes</button>
                      <button className='JobApplicationButtons' onClick={() => setShowConfirm(false)}>No</button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageHeadhunterAccounts;
