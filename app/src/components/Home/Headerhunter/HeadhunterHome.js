import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HeadhunterHome() {
  const [jobPostings, setJobPostings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Fetches all the job-postings
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  //maps postings
  return (
    <div>
      <h2 className='JobListingWordContainer'>Job Postings</h2>
        <ul>
          {jobPostings.map((jobPosting) => (
            <li key={jobPosting.id}>
              <div className='HeadhunterJobsContainer'>
                <div>
                  <p><strong>Title: </strong>{jobPosting.title}</p>
                  <p><strong>employer: </strong>{jobPosting.employer} </p>
                  <p><strong>company: </strong>{jobPosting.company}</p>
                  <p><strong>Degree: </strong>{jobPosting.minimum_degree}</p>
                  <p><strong>description: </strong>{jobPosting.description}</p>
                </div>
                <div className='HeadhunterHomeButtons'>
                  <button className='JobApplicationButtons'>
                        <Link className='NotificationLinks' to={`/people/${jobPosting.employerId}`}>View employer's profile</Link>
                  </button>
                  <button className='JobApplicationButtons'>
                    <Link className='NotificationLinks' to={`/job-applicants-headhunter/${jobPosting.id}`}>View Applicants</Link>
                  </button>
                </div>
              </div>
            </li>
          ))}
       </ul>
    </div>
  );
}

export default HeadhunterHome;