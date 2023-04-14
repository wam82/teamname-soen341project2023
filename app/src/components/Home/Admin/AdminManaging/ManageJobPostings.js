import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//deletes job posting and all of the applications
function ManageJobPostings() {
  const [jobPostings, setJobPostings] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] = useState(null);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/job-postings');
        setJobPostings(response.data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-job-posting/${id}`);
      console.log(response.data);
      setJobPostings(jobPostings.filter((jobPosting) => jobPosting.id !== id));
      setShowConfirm(false);
      setSelectedJobPosting(null);
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
      <h2 className='JobListingWordContainer'>Manage Job Postings</h2>
      <ul>
        {jobPostings.map((jobPosting) => (
          <li key={jobPosting.id}>
            <div className='HeadhunterJobsContainer'>
              <div>
                <p><strong>title: </strong>{jobPosting.title}</p>
                <p><strong>employer: </strong>{jobPosting.employer} </p>
                <p><strong>company: </strong>{jobPosting.company}</p>
                <p><strong>description: </strong>{jobPosting.description}</p>
              </div>
              <div className='HeadhunterHomeButtons'>
              <button className='JobApplicationButtons'>
                <Link className='NotificationLinks' to={`/people/${jobPosting.employerId}`}>Employer's Profile</Link>
              </button>
              <button className='JobApplicationButtons' onClick={() => {
                setShowConfirm(true);
                setSelectedJobPosting(jobPosting);
              }}>Delete</button>
              {showConfirm && selectedJobPosting === jobPosting && (
                <div>
                  <p>Are you sure you want to delete this job posting?</p>
                  <button className='JobApplicationButtons' onClick={() => handleDelete(selectedJobPosting.id)}>Yes</button>
                  <button className='JobApplicationButtons' onClick={() => setShowConfirm(false)}>No</button>
                </div>
              )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageJobPostings;
