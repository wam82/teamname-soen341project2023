import React, { useState, useEffect } from 'react';
import axios from 'axios';

//admin must only see the job on this page
//uses props
function JobDetailsForAdmin(props) {
  const [job, setJob] = useState(null);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/${props.match.params.id}`);
        setJob(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [props.match.params.id]);

  if (userType !== 'ADMIN') {
    return (
      <div>
        <h2>You are not allowed to view this page</h2>
      </div>
    );
  }


  return (
    <div>
      {job ? (
        <div>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>{job.employer}</p>
          <p>{job.company}</p>
          <p>{job.minimum_degree}</p>
          <button onClick={props.history.goBack}>Back</button>
        </div>
      ) : (
        <p>This job does not exist</p>
      )}
    </div>
  );
}

export default JobDetailsForAdmin;
