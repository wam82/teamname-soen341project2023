import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HandleResume from './HandleResume';


//Uses a resume template
function EditProfileAddResume() {
  const [degree, setDegree] = useState('');
  const [summary, setSummary] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [userType, setUserType] = useState('');

  //fetches data from backend if existent
  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUserType(response.data.user_type);
        const resumeResponse = await axios.get(`http://localhost:5000/studentResume/${userId}`);
        const data = resumeResponse.data.data;
        console.log(resumeResponse.data);
        if (data) {
          setDegree(data.degree || '');
          setSummary(data.summary || '');
          setExperience(data.experience || '');
          setSkills(data.skills || '');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  //handle submit if resume is changed
  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        const userId = localStorage.getItem('userId');
        const formData = { degree, summary, experience, skills };
        const response = await axios.post(`http://localhost:5000/studentResume/${userId}`, formData);
        console.log(response.data);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 5000); // Enable the button again after 5 seconds
      } catch (error) {
        console.error(error);
      }
  };

  //resume template
  return (
    <div>
      <h2 className='JobListingWordContainer'>Add Resume</h2>
      <h3 className='NotificationContainer'>Try our HiredIn Template!</h3>
      {userType === 'STUDENT' ? (
      <div>
        <form onSubmit={handleSubmit}>
          <div className='EditJobContainer'>
            <div className='EditProfileInputs'>
              <label className='EditProfileLabels' htmlFor="degree">Degree:</label>
              <select className='EditProfileInputBlock' id="degree" value={degree} onChange={(event) => setDegree(event.target.value)}>
                <option value="">Select a degree</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div className='EditProfileInputs'>
              <label className='EditProfileLabels' htmlFor="summary">Summary:</label>
              <textarea className='EditProfileInputBlock textAreaInputs' id="summary" value={summary} onChange={(event) => setSummary(event.target.value)} />
            </div>
            <div className='EditProfileInputs'>
              <label className='EditProfileLabels' htmlFor="experience">Experience:</label>
              <textarea className='EditProfileInputBlock textAreaInputs' id="experience" value={experience} onChange={(event) => setExperience(event.target.value)} />
            </div>
            <div className='EditProfileInputs'>
              <label className='EditProfileLabels' htmlFor="skills">Skills:</label>
              <textarea className='EditProfileInputBlock textAreaInputs' id="skills" value={skills} onChange={(event) => setSkills(event.target.value)} />
            </div >
          </div>
          <div className='ShowNotificationButton'>
            <button className='JobApplicationButtons' type="submit" disabled={isSaved}>
              {isSaved ? 'Changes saved!' : 'Save changes'}
            </button>
          </div>
        </form> 
        <h3 className='NotificationContainer'>Upload you resume here</h3>
        <HandleResume />
      </div>
      ) : (
        <p>You are not a student, you are not allowed to use this page. Fuck off.</p>
      )}
    </div>
  );
}

export default EditProfileAddResume;
