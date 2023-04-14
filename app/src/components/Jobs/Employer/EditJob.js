import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


//Edits a job. It takes a prop for jobId
function EditJob(props) {

  const jobId = props.match.params.id;
  const [job, setJob] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employer, setEmployer] = useState('');
  const [company, setCompany] = useState('');
  const [minimumDegree, setMinimumDegree] = useState('');

  const history = useHistory();
  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    
    //fetch the job in database to display current values
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/${jobId}`);
        setJob(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setEmployer(response.data.employer);
        setCompany(response.data.company);
        setMinimumDegree(response.data.minimum_degree);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [jobId]);

  //When changes are submitted
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/jobs/${jobId}`, {
        title,
        description,
        employer,
        company,
        minimum_degree: minimumDegree
      });
      console.log(response.data);
      history.push(`/jobs/${jobId}`);
    } catch (error) {
      console.error(error);
    }
  };

  //If the employer is not the one who created he does not have access to the page
  if (job && Number(job.employerId) !== userId) {
    return (
      <div>
        <h2>You are not allowed to view this page</h2>
      </div>
    );
  }

  //Edit form
  return (
    <div>
      {job ? (
        <div>
          <h2 className='JobListingWordContainer'>Edit Job Posting</h2>
          <form className='FormContainer' onSubmit={handleFormSubmit}>
            <div className='EditJobContainer'>
              <div className='EditProfileInputs'>
                <label className='EditProfileLabels'>Title:</label>
                <input className='EditProfileInputBlock' type="text" value={title} onChange={event => setTitle(event.target.value)} />
              </div>
              <div className='EditProfileInputs'>
                <label className='EditProfileLabels'>Employer:</label>
                <input className='EditProfileInputBlock' type="text" value={employer} onChange={event => setEmployer(event.target.value)} />
              </div>
              <div className='EditProfileInputs'>
                <label className='EditProfileLabels'>Company:</label>
                <input className='EditProfileInputBlock' type="text" value={company} onChange={event => setCompany(event.target.value)} />
              </div>
              <div className='EditProfileInputs'>
                <label className='EditProfileLabels'>Minimum Degree:</label>
                <select className='EditProfileInputBlock' value={minimumDegree} onChange={event => setMinimumDegree(event.target.value)}>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div className='EditProfileInputs'>
                <label className='EditProfileLabels'>Description:</label>
                <textarea className='EditProfileInputBlock textAreaInputs' value={description} onChange={event => setDescription(event.target.value)} />
              </div>
            </div>
            <div className='ShowNotificationButton'>
              <button className='JobApplicationButtons' type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditJob;
