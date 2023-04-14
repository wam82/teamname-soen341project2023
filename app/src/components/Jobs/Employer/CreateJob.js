import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

//When create job button is pressed
function CreateJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employer, setEmployer] = useState('');
  const [company, setCompany] = useState('');
  const [minimumDegree, setMinimumDegree] = useState('');
  const userType = localStorage.getItem('userType');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  //When user submits
  const handleFormSubmit = async event => {
    event.preventDefault();

    //check if any input field is empty
    if (title === '' || description === '' || employer === '' || company === '' || minimumDegree === '') {
      setErrorMessage('Please fill in all the fields.');
      return;
    }
    
    //sends eveything to backend in body params
    try {
      const employerId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:5000/create-job', {
        title,
        description,
        employer,
        company,
        minimum_degree: minimumDegree,
        employerId
      });
      console.log(response.data);
      history.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  //if the user is not employer it prevents access
  if (userType !== 'EMPLOYER') {
    return (
      <div>
        <h2>You do not have the privilege of creating a job posting</h2>
      </div>
    );
  }

  //Input forms handling 
  return (
    <div>
      <h2 className='JobListingWordContainer'>Create Job Posting</h2>
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
              <option value="---Select---">---Select---</option>
              <option value="Bachelors">Bachelor</option>
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
          <button className='JobApplicationButtons' type="submit">Create Job</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default CreateJob;
