import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


//deletes job applications for a specific job
function ManageJobApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/job-applications');
        const applications = await Promise.all(response.data.map(async (application) => {
          const jobResponse = await axios.get(`http://localhost:5000/jobs/${application.jobId}`);
          const userResponse = await axios.get(`http://localhost:5000/users/${application.userId}`);
          return {
            ...application,
            jobId: jobResponse.data.id,
            jobTitle: jobResponse.data.title,
            applicantName: `${userResponse.data.firstName} ${userResponse.data.lastName}`,
            applicantEmail: userResponse.data.email,
            userId: userResponse.data.id,
          };
        }));
        setApplications(applications);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-job-application/${id}`);
      console.log(response.data);
      setApplications(applications.filter((application) => application.id !== id));
      setShowConfirm(false);
      setSelectedApplication(null);
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
      <h2 className='JobListingWordContainer'>Manage Job Applications</h2>
      <ul className="applications-container">
        {applications.map((application) => (
          <li key={application.id} className="application-item">
            <div className='HeadhunterJobsContainer'>
            <div>
              <p><strong>ID:</strong> {application.id}</p>
              <p>
                <strong>Job Title:</strong> {application.jobTitle}
              </p>
              <p>
                <strong>Applicant Name:</strong> {application.applicantName}
              </p>
              <p><strong>Applicant Email:</strong> {application.applicantEmail}</p>
            </div>
            <div className='HeadhunterHomeButtons'>
              <button className='JobApplicationButtons'>
                <Link className='NotificationLinks' to={`/people/${application.userId}`}>Applicant's Profile</Link></button>
              <button className='JobApplicationButtons' onClick={() => {
                setShowConfirm(true);
                setSelectedApplication(application);
              }}>Delete</button>
              {showConfirm && selectedApplication === application && (
                <div>
                  <p>Are you sure you want to delete this application?</p>
                  <button className='JobApplicationButtons' onClick={() => handleDelete(selectedApplication.id)}>Yes</button>
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

export default ManageJobApplications;
