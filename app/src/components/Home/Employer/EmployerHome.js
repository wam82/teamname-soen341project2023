import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployerHome() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    //EmployerId in local storage
    const employerId = localStorage.getItem('userId');
    const fetchJobs = async () => {
      try {

        //Fetch jobs by a specific employer
        const response = await axios.get(`http://localhost:5000/jobs-by-employer/${employerId}`);
        
        //Maps reponse.data in jobs and job.pendingApplications(Ones that the employer has not accepted, which allows to display how many pending applications)
        const jobsWithPendingApplications = await Promise.all(
          response.data.map(async job => {
            const response = await axios.get(`http://localhost:5000/job-applications/${job.id}`);
            const jobApplications = response.data;
            const pendingApplications = jobApplications.filter(application => application.isAccepted === null);
            if (pendingApplications.length > 0) {
              return { ...job, pendingApplications };
            }
            return job;
          })
        );
        setJobs(jobsWithPendingApplications);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  //Links to job posting page, and maps all the employers jobs.
  return (
    <div>
      <h2 className='JobListingWordContainer'>Employer Home</h2>
      <button className='JobApplicationButtons CreatePostButton'>
        <Link className='NotificationLinks' to="/create-job">Create Job Posting</Link>
      </button>
      <h3 className='JobListingWordContainer'>Your Jobs</h3>

      {jobs.length > 0 ? (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <Link className='ButtonStyleLinks' to={`/jobs/${job.id}`}>
                <div className='EmployerJobsDetailsContainer'>
                  <div className='SingleJobPostingContainer'>
                    <p><strong>Title : </strong>{job.title}</p>
                    <p><strong>Company : </strong>{job.company}</p>
                    <p><strong>Degree : </strong>{job.minimum_degree}</p>
                  </div>
                  <div>
                    {job.pendingApplications && (
                      <button className='EmployerJobsButtons'>{job.pendingApplications.length} pending applications!</button>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default EmployerHome;
