import React, { useState, useEffect } from 'react';
import profilePicture from './222.jpg';

//general setting edit
//pretty much setting from users table
//uses a prop
function EditProfileGeneralSettings() {
  // SUPABASE BUCKET *************************
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = 'https://xscgcgyexmdnddmzfhhk.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzY2djZ3lleG1kbmRkbXpmaGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzNjc5MTksImV4cCI6MTk5NDk0MzkxOX0.M61bgrfHs5GXTMChYOwIYdfYUW70ovg0SseU2CJk4z8';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    loadImage().then((src) => setImageSrc(src));
  }, []);


  // <input/> element onClick
  const handleImage = async (e) => {
    let image = e.target.files[0]
    // Get image detail
    const userId = localStorage.getItem('userId');
    const filename = "images/"+userId+".png"
    console.log(filename)
    // upload to bucket
    const { data, error } = await supabase.storage
    .from('images')
    .upload(filename, image, {
      cacheControl: '3600',
      upsert: true,
    });
    console.log(error)
    // reload image
    document.getElementById("getImage").src= loadImage();
  }

  const loadImage = () =>
  {
    const userId = localStorage.getItem('userId');
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
  }
  
  // END OF SUPABASE BUCKET **********************
  return (
    <div>
      <h3 className='JobListingWordContainer'>Profile Picture</h3>
      <div className='ProfilePicPageContainer'>
        <div className='EditProfileImageContainer'>
          <img className='ProfilePictureEditContainer' id="getImage" src={imageSrc} width='250' height='250' />
        </div>
        <div className='ProfilePicButtonsContainer'>
          <button className='JobApplicationButtons' onClick={(e) => document.getElementById('getFile').click()}>Upload new picture</button>
          <input type='file' id="getFile" style={{display: 'none'}} accept="image/*" onChange={handleImage}/>
        </div>
      </div>
    </div>
  );
}

export default EditProfileGeneralSettings;

