import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentHome() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    //Fetches all the jobs
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);


  //maps job, diplay title, employer. If no jobs, returns no jobs found.
  return (
    <div>
      <div className='JobListingWordContainer'>
        <h2>Job Listings</h2>
      </div>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <Link className='ButtonStyleLinks' to={`/jobs/${job.id}`}>
                <div className='SingleJobPostingContainer'>
                  <h3>Title:{job.title} </h3>
                  <h4>Employer: {job.employer}</h4>
                  <h4>Company: {job.company}</h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
}

export default StudentHome;
