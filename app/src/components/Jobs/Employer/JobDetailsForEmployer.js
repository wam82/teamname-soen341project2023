import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//Display edit, delete and view for a specific job
function JobDetailsForEmployer(props) {
  const [job, setJob] = useState(null);
  const [hasUnseenApplicants, setHasUnseenApplicants] = useState(false);
  const userId = localStorage.getItem('userId');

  //Fetch the job
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

  //Fetch applicant in job_application table where employerDismiss = null
  useEffect(() => {
    const fetchUnseenApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/applicants/${props.match.params.id}`);
        const unseenApplicants = response.data.filter(applicant => applicant.employerDismiss === null);
        setHasUnseenApplicants(unseenApplicants.length > 0);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUnseenApplicants();
  }, [props.match.params.id]);

  //Delete a job posting
  const handleDelete = async () => {
    try {
      const jobId = props.match.params.id;
      await axios.delete(`http://localhost:5000/jobs/${jobId}`);
      props.history.push('/employer-home');
    } catch (error) {
      console.error(error);
    }
  };

  //Verify if authorized
  if (job && Number(job.employerId) !== Number(userId)) {
    return (
      <div>
        <h2>You are not allowed to view this page</h2>
      </div>
    );
  }

  //job description
  //Link to edit page
  //link to applicant page for employer
  return (
    <div>
      {job ? (
        <div>
          <h2 className='JobListingWordContainer'>Title: {job.title}</h2>
          {hasUnseenApplicants && <div className='NotificationContainer'>
                                    <h3 className='NewNotificationText'>New unseen applicants for this job!</h3>
                                    <button className='JobApplicationButtons ResumeButton' id='ViewApplicantsButton'>
                                      <Link className='NotificationLinks' to={`/job-applicants-employer/${job.id}`}>View Applicants</Link>
                                    </button>
                                  </div>}
          <div className='WholeJobContainer'>
            <p><strong>Employer: </strong>{job.employer}</p>
            <p><strong>Company: </strong>{job.company}</p>
            <p><strong>Degree: </strong>{job.minimum_degree}</p>
            <div className='JobDescription'>
              <p><strong>Description: </strong>Description: {job.description}</p>
            </div>
          </div>
          <div className='EmployerJobButtonsContainer'>
            <button className='JobApplicationButtons ResumeButton'>
              <Link className='NotificationLinks' to={`/edit-job/${job.id}`}>Edit</Link>
            </button>
            <button className='JobApplicationButtons ResumeButton' onClick={handleDelete}>Delete</button>
            <button className='JobApplicationButtons ResumeButton' id='ViewApplicantsButton'>
              <Link className='NotificationLinks' to={`/job-applicants-employer/${job.id}`}>View Applicants</Link>
            </button>
          </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default JobDetailsForEmployer;
