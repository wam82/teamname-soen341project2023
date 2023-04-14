import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function NotificationForEmployer() {
  const [jobs, setJobs] = useState([]);

  //Fetch all new applicants. Unlike student, he only wants new notifications
  useEffect(() => {
    const employerId = localStorage.getItem('userId');
    //fetches all jobs first
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs-by-employer/${employerId}`);
        const jobsWithNewApplicants = await Promise.all(
          
          //maps job as jobApplications and has newApplicants applications(where employerDismiss = null)
          response.data.map(async job => {
            const response = await axios.get(`http://localhost:5000/job-applications/${job.id}`);
            const jobApplications = response.data;
            const hasNewApplicants = jobApplications.some(application => application.employerDismiss === null);
            if (hasNewApplicants) {
              return { ...job, hasNewApplicants, jobApplications };
            }
            return null;
          })
        );
        setJobs(jobsWithNewApplicants.filter(job => job !== null));
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  //Displays which jobs have new applicants
  return (
    <div>
      <h3 className='JobListingWordContainer'>Notification</h3>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map(job => (
            <li className='EmployerNotificationListContainer' key={job.id}>
              <p>
                <strong>
                  You have {job.jobApplications && job.jobApplications.length > 0 ? (
                    <span> {job.jobApplications.length}</span>
                    ) : null} new applications for the job posting: 
                </strong>
                <span> {job.title} </span>
              </p>
              <div className='EmployerJobButtonsContainer'>
                <button className='JobApplicationButtons'>
                  <Link className='NotificationLinks' to={`/jobs/${job.id}`}>View Job</Link>
                </button>
                <button className='JobApplicationButtons'>
                  <Link className='NotificationLinks' to={`/job-applicants-employer/${job.id}`}>{job.hasNewApplicants ? ' View applications' : ''}</Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
}

export default NotificationForEmployer;
