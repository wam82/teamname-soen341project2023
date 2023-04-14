import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

//takes a prop
function JobDetailsForStudent(props) {
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isAccepted, setIsAccepted] = useState(null);
  const history = useHistory();

  //fetches all the jobs when renders
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/${props.match.params.id}`);
        setJob(response.data);
        const jobId = props.match.params.id;
        const userId = localStorage.getItem('userId');
        const jobApplicationResponse = await axios.get(`http://localhost:5000/job-applications/${jobId}/${userId}`);
        if (jobApplicationResponse.data.length > 0) {
          const jobApplication = jobApplicationResponse.data[0];
          setIsApplied(true);
          setIsAccepted(jobApplication.isAccepted);
          
          //User has seen his application, in job_application table in supabase, it sets studentDismiss to true. 
          handleDismiss();
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [props.match.params.id]);

  //what happends when apply button is clicked
  const handleApply = async () => {
    try {
      const response = await axios.post('http://localhost:5000/job-applications', {
        jobId: job.id,
        userId: localStorage.getItem('userId')
      });
      console.log(response.data);
      setIsApplied(true);
    } catch (error) {
      console.error(error);
    }
  };

  //if student wish to cancel job applications by pressing cancel button
  const handleCancel = async () => {
    try {
      const jobId = props.match.params.id;
      const userId = localStorage.getItem('userId');
      await axios.delete(`http://localhost:5000/job-applications/${jobId}/${userId}`);
      setIsApplied(false);
      setIsAccepted(null);
    } catch (error) {
      console.error(error);
    }
  };

  //Allows user to not see as a new notification everytime
  const handleDismiss = async () => {
    try {
      const jobId = props.match.params.id;
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:5000/job-applications/${jobId}/${userId}`, {
        studentDismiss: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  //When home button is pressed
  const handleHome = () => {
    history.goBack();
  };


  //maps jobs,
  //if isAccepted = false (rejected for interview)
  //if not in database (isApplied = null) , can press apply button
  //if isApplied = true, isAccept = true (accepted for interview)
  //Only way to display 'Loading' is by illegal access which prevents from accessing.
  return (
    <div>
      {job ? (
        <div className='JobPageContainer'>
          <div className='WholeJobContainer'>
            <p><strong>Title: </strong>{job.title}</p>
            <p><strong>Employer: </strong>{job.employer}</p>
            <p><strong>Company: </strong>{job.company}</p>
            <p><strong>Degree: </strong>{job.minimum_degree}</p>
            <div className='JobDescription'>
              <p><strong>Description: </strong>{job.description}</p>
            </div>
          </div>
          <div className='JobPageButtonsContainer'>
            {isAccepted === false ? (
              <p>You were rejected for this job. Please apply for a different one.</p>
            ) : (
              <>
                {!isApplied ? (
                  <button className='JobApplicationButtons' onClick={handleApply}>Apply</button>
                ) : (
                  <>
                    {isAccepted === true && isApplied && (
                      <p>Congratulations! You were selected for the interview for this job.</p>
                    )}
                    <button className='JobApplicationButtons' onClick={handleCancel}>Cancel Application</button>
                  </>
                )}
              </>
            )}
            <button className='JobApplicationButtons' onClick={handleHome}>Home</button>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );  

}

export default JobDetailsForStudent;
