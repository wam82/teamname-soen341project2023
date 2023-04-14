import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profilePicture from '../Profile/222.jpg';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://xscgcgyexmdnddmzfhhk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzY2djZ3lleG1kbmRkbXpmaGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzNjc5MTksImV4cCI6MTk5NDk0MzkxOX0.M61bgrfHs5GXTMChYOwIYdfYUW70ovg0SseU2CJk4z8';
const supabase = createClient(supabaseUrl, supabaseKey);


//takes prop
//display a specific user
//if user is a student, display his resume too
function SpecificUser(props) {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [imageSrc, setImageSrc] = useState(profilePicture);
  const [message, setMessage] = useState('');


  const downloadResume = async () => {
    const userId = props.match.params.id;
    const filename = `resumes/${userId}.pdf`;
    const { data, error } = await supabase.storage
      .from('images')
      .download(filename);
  
    if (error) {
      console.error(error);
      setMessage('User has not uploaded a resume');
      return;
    }
  
    setMessage('');
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${userId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${props.match.params.id}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();

    const fetchResume = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/studentResume/${props.match.params.id}`);
        setResume(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResume();
    loadImage().then((src) => setImageSrc(src));
  }, [props.match.params.id]);

  const loadImage = () => {
    const userId = props.match.params.id;
    const url = `https://xscgcgyexmdnddmzfhhk.supabase.co/storage/v1/object/public/images/images/${userId}.png?dummy=${new Date()}`;
    return new Promise((resolve) => {
      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            resolve(url);
          } else {
            resolve(profilePicture);
          }
        })
        .catch(() => {
          resolve(profilePicture);
        });
    });
  };

  //user infos...
  //If invalid, it displays user does not exist to prevent random numbers
  return (
    <div>
      <h2 className='JobListingWordContainer'>User Profile</h2>
      {user ? (
        <div>
          <div className='SpecificUserContainer'>
            <div className='UserType2'>
              <p className='UserTypeSpecific'>{user.user_type}</p>
            </div>
            <img className='SpecificProfilePicture' src={imageSrc} alt="Profile picture" style={{ width: "200px", height: "200px" }} />
            <p><strong>Name: </strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email: </strong> {user.email}</p>
          </div>
          {(user.user_type === 'STUDENT' && !resume) && (
            <p>This student does not have a resume.</p>
          )}
          {resume ? (
            <div>
              <div>
                <h3 className='JobListingWordContainer'>Student's Resume (via Template)</h3>
                <div className='SpecificUserContainer'>
                  <p><strong>Summary:</strong> {resume.summary}</p>
                  <p><strong>Experience:</strong> {resume.experience}</p>
                  <p><strong>Degree:</strong> {resume.degree}</p>
                  <p><strong>Skills:</strong> {resume.skills}</p>
                </div>
              </div>
              <h3 className='JobListingWordContainer'>Student's Uploaded Resume</h3>
              <div>
                <button className='JobApplicationButtons ResumeButton ProfileResumeButton' onClick={downloadResume}>
                  Download Resume
                </button>
                {message && <p className='ResumeContainer'>{message}</p>}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <p>User does not exist</p>
      )}
    </div>
  );
}

export default SpecificUser;
