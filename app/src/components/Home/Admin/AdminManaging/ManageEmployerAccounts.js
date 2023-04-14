import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//delete employer account, his job and job applications for his jobs
function ManageEmployerAccounts() {
  const [employers, setEmployers] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/employers');
        setEmployers(response.data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-employer/${id}`);
      console.log(response.data);
      setEmployers(employers.filter((employer) => employer.id !== id));
      setShowConfirm(false);
      setSelectedEmployer(null);
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
      <h2 className='JobListingWordContainer'>Manage Employer Accounts</h2>
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
          {employers.map((employer) => (
            <React.Fragment key={employer.id}>
              <tr>
                <td>{employer.id}</td>
                <td>{employer.firstName} {employer.lastName}</td>
                <td>{employer.email}</td>
                <td>
                <div className='AdminManagingButtons'>
                  <button className='JobApplicationButtons' onClick={() => {
                    setShowConfirm(true);
                    setSelectedEmployer(employer);
                  }}>Delete</button>
                  <button className='JobApplicationButtons'><Link className='NotificationLinks' to={`/people/${employer.id}`}>View Profile</Link></button>
                </div>
                </td>
              </tr>
              {showConfirm && selectedEmployer === employer && (
                <tr>
                  <td colSpan="4">
                    <p>Are you sure you want to delete this account?</p>
                    <div className='AdminManagingButtons'>
                      <button className='JobApplicationButtons' onClick={() => handleDelete(selectedEmployer.id)}>Yes</button>
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

export default ManageEmployerAccounts;
