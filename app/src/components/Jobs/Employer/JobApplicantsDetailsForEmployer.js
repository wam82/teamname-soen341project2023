
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


//Takes a prop
//Display applicants for a job
function JobApplicantsDetailsForEmployer(props) {
  const [applicants, setApplicants] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const jobId = props.match.params.id;
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/applicants/${jobId}`);
        const applicantsWithDetails = await Promise.all(
          response.data.map(async applicant => {
            const { data } = await axios.get(`http://localhost:5000/users/${applicant.userId}`);
            if (applicant.isApplied) {
              return { ...applicant, ...data };
            } else {
              return null;
            }
          })
        );
        const filteredApplicants = applicantsWithDetails.filter(applicant => applicant !== null);
        setApplicants(filteredApplicants);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplicants();

    // Check if the user is authorized
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:5000/jobs/${jobId}`)
      .then(res => {
        const job = res.data;
        console.log(job.id, jobId);
        console.log(job.employerId, userId);
        if (parseInt(job.id) === parseInt(jobId) && parseInt(job.employerId) === parseInt(userId)) {
          setIsAuthorized(true);
          console.log('isAuthorized after setIsAuthorized:', isAuthorized);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.match.params.id]);

  //If employer accept a student
  const handleAccept = async (userId, jobId) => {
    try {
      await axios.put(`http://localhost:5000/applications/${userId}/${jobId}`, { isAccepted: true });
      const updatedApplicants = applicants.map(applicant => {
        if (applicant.userId === userId) {
          return { ...applicant, isAccepted: true };
        }
        return applicant;
      });
      setApplicants(updatedApplicants);
    } catch (error) {
      console.error(error);
    }
  };

  //if employer wants to cancel interview
  const handleCancel = async (userId, jobId) => {
    try {
      await axios.put(`http://localhost:5000/applications/${userId}/${jobId}`, { isAccepted: null });
      const updatedApplicants = applicants.map(applicant => {
        if (applicant.userId === userId) {
          return { ...applicant, isAccepted: null };
        }
        return applicant;
      });
      setApplicants(updatedApplicants);
    } catch (error) {
      console.error(error);
    }
  };

  //If the employer rejects
  const handleReject = async (userId, jobId) => {
    try {
      await axios.put(`http://localhost:5000/applications/${userId}/${jobId}`, { isAccepted: false, isApplied: false });
      const updatedApplicants = applicants.filter(applicant => applicant.userId !== userId);
      setApplicants(updatedApplicants);
    } catch (error) {
      console.error(error);
    }
  };

  //Once view applicant page is visited, new applicants should be marked as seen so new time he loads the page it does not say new next to them
  const markApplicantsAsSeen = async () => {
    try {
      const jobId = props.match.params.id;
      const response = await axios.put(`http://localhost:5000/employer-seen/${jobId}`, { employerDismiss: true });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  //wait 2 seconds on on page to mark applicants as seen
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(isAuthorized);
      if (isAuthorized){
        markApplicantsAsSeen();
      }
    }, 5000);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAuthorized]);
  
  

  // Check if the user is authorized
  if (!isAuthorized) {
    return <div>You are not authorized to view this page asshole.</div>;
  }

  //maps applicants for the job
  //Check if user is a new applicant
  //Check if user was recommend by headhunter
  //If user is accepted, employer can cancel interview
  //If no applicant, it display no applicant found
  return (
    <div>
      <h2 className='JobListingWordContainer'>Job Applicants</h2>
      {applicants.length > 0 ? (
        <ul>
          {applicants.map(applicant => (
            <li className='FullApplicantContainer' key={applicant.id}>
              <div className='ViewApplicantContainer'>
                <p>
                  <strong>Applicant's Name: </strong>{applicant.firstName}, {applicant.lastName} 
                </p>
                {applicant.employerDismiss === null ? (
                  <p className='NewRecommendation'>New Applicant</p>
                ) : null} 
                {applicant.isRecommended ? (
                  <p className='HeadhunterRecommendation'>Recommended By a Headhunter</p>
                ) : null}
              </div>
              {applicant.isAccepted ? (
                <div className='EmployerJobButtonsContainer'>
                  <button className='JobApplicationButtons ResumeButton' onClick={() => handleCancel(applicant.userId, props.match.params.id)}>Cancel Interview</button>
                  <button className='JobApplicationButtons ResumeButton'><Link className='NotificationLinks' to={`/people/${applicant.userId}`}>View Profile</Link></button>
                </div>
              ) : (
                <div className='EmployerJobButtonsContainer'>
                  <button className='JobApplicationButtons ResumeButton' onClick={() => handleAccept(applicant.userId, props.match.params.id)}>Accept</button>
                  <button className='JobApplicationButtons ResumeButton' onClick={() => handleReject(applicant.userId, props.match.params.id)}>Reject</button>
                  <button className='JobApplicationButtons ResumeButton'><Link className='NotificationLinks' to={`/people/${applicant.userId}`}>View Profile</Link></button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No applicants found.</p>
      )}
    </div>
  );
}

export default JobApplicantsDetailsForEmployer;
