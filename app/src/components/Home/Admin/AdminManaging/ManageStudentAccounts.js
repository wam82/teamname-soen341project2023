import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


//delete student account and his applicaitons
function ManageStudentAccounts() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-student/${id}`);
      console.log(response.data);
      setStudents(students.filter((student) => student.id !== id));
      setShowConfirm(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (userType !== 'ADMIN') {
    return (
      <div>
        <h2>You are not allowed to view this page</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className='JobListingWordContainer'>Manage Student Accounts</h2>
      <table className='TableContainer'>
        <thead>
          <tr >
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <React.Fragment key={student.id}>
              <tr>
                <td>{student.id}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.email}</td>
                <td>
                <div className='AdminManagingButtons'>
                  <button className='JobApplicationButtons' onClick={() => {
                    setShowConfirm(true);
                    setSelectedStudent(student);
                  }}>Delete</button>
                  <button className='JobApplicationButtons'><Link className='NotificationLinks' to={`/people/${student.id}`}>View Profile</Link></button>
                </div>
                </td>
              </tr>
              {showConfirm && selectedStudent === student && (
                <tr>
                  <td colSpan="4">
                    <p>Are you sure you want to delete this account?</p>
                    <div className='AdminManagingButtons'>
                      <button className='JobApplicationButtons' onClick={() => handleDelete(selectedStudent.id)}>Yes</button>
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

export default ManageStudentAccounts;
