import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


//headhunter
function JobApplicantsDetailsForHeadhunter(props) {
  const [applicants, setApplicants] = useState([]);

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
  }, [props.match.params.id]);

  //can recommend students, set isReccommended to true for employers
  const handleRecommend = async (userId, jobId) => {
    try {
      await axios.put(`http://localhost:5000/headhunter-recommend/${userId}/${jobId}`, { isRecommended: true });
      const updatedApplicants = applicants.map(applicant => {
        if (applicant.userId === userId) {
          return { ...applicant, isRecommended: true };
        }
        return applicant;
      });
      setApplicants(updatedApplicants);
    } catch (error) {
      console.error(error);
    }
  };

  //can cancel his recommendations
  const handleCancelRecommend = async (userId, jobId) => {
    try {
      await axios.put(`http://localhost:5000/headhunter-cancel-recommend/${userId}/${jobId}`, { isRecommended: false });
      const updatedApplicants = applicants.map(applicant => {
        if (applicant.userId === userId) {
          return { ...applicant, isRecommended: false };
        }
        return applicant;
      });
      setApplicants(updatedApplicants);
    } catch (error) {
      console.error(error);
    }
  };

  // Check if the user is authorized to view the page
  const userType = localStorage.getItem('userType');
  if (userType !== 'HEADHUNTER') {
    return <div>You are not authorized to view this page.</div>;
  }

  //same shit. mapping and handle reccomend and cancel button
  return (
    <div>
      <h2 className='JobListingWordContainer'>Job Applicants</h2>
      {applicants.length > 0 ? (
        <ul>
          {applicants.map(applicant => (
            <li className='FullApplicantContainerHeadhunter'  key={applicant.id}>
                <div className='ViewApplicantContainer'>
                  <p>
                    <strong>Applicant's Name: </strong>{applicant.firstName}, {applicant.lastName} 
                  </p>
                </div>
                {applicant.isRecommended ? (
                  <div className='EmployerJobButtonsContainer'>
                    <button className='JobApplicationButtons ResumeButton' onClick={() => handleCancelRecommend(applicant.userId, props.match.params.id)}>Cancel Recommendation</button>
                    <button className='JobApplicationButtons ResumeButton'><Link className='NotificationLinks' to={`/people/${applicant.userId}`}>View Profile</Link></button>
                  </div>
                ) : (
                  <div className='EmployerJobButtonsContainer'>
                    <button className='JobApplicationButtons ResumeButton' onClick={() => handleRecommend(applicant.userId, props.match.params.id)}>Recommend</button>
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

export default JobApplicantsDetailsForHeadhunter;