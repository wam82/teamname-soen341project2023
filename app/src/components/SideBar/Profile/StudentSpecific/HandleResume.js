import React, { useState, useEffect } from 'react';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://xscgcgyexmdnddmzfhhk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzY2djZ3lleG1kbmRkbXpmaGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzNjc5MTksImV4cCI6MTk5NDk0MzkxOX0.M61bgrfHs5GXTMChYOwIYdfYUW70ovg0SseU2CJk4z8';
const supabase = createClient(supabaseUrl, supabaseKey);

function HandleResume() {
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');


  const showMessage = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleResume = async (e) => {
    let resume = e.target.files[0];
    const filename = `resumes/${userId}.pdf`;
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filename, resume, {
        cacheControl: '5',
        upsert: true,
      });

    if (data) {
      showMessage('Resume uploaded successfully');
    } else {
      showMessage('Resume upload failed');
    }
  };

  const downloadResume = async () => {
    const filename = `resumes/${userId}.pdf`;
    const { data, error } = await supabase.storage
      .from('images')
      .download(filename);

    if (error) {
      showMessage('You have not uploaded a resume');
      return;
    }

    showMessage('');

    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${userId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteResume = async () => {
    const filename = `resumes/${userId}.pdf`;
    const { data, error } = await supabase.storage
      .from('images')
      .remove([filename]);

    if (error) {
      showMessage('Resume deletion error');
      console.error(error);
    } else {
      showMessage('Resume deleted successfully if you uploaded it!');
    }
  };

  return (
    <div>
      <button className='JobApplicationButtons ResumeButton ProfileResumeButton' onClick={(e) => document.getElementById('getFile').click()}>Upload new resume</button>
      <input type='file' id="getFile" style={{display: 'none'}} accept=".pdf" onChange={handleResume}/>
      <button className='JobApplicationButtons ResumeButton ProfileResumeButton' onClick={(e) => downloadResume()}>Download resume</button>
      <button className='JobApplicationButtons ResumeButton ProfileResumeButton' onClick={(e) => deleteResume()}>Delete resume</button>
      {message && <p className='ResumeContainer'>{message}</p>}
    </div>
  );
}

export default HandleResume;

