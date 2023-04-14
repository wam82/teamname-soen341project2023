import React from 'react';
import { Link } from 'react-router-dom';
import EditProfileGeneralSettings from './EditProfileGeneralSettings';


//links to edit general setting page
//link to edit resume template for student
function EditProfile() {
  const userType = localStorage.getItem('userType');

  return (
    <div>
        <div className='JobListingWordContainer'>
          <h2>Edit Profile</h2>
        </div>
        <div>
          <EditProfileGeneralSettings/>
          {userType === 'STUDENT' && (
            <button className='JobApplicationButtons ResumeButton'>
              <Link className='NotificationLinks' to="/edit-resume">Add Resume</Link>
            </button>
          )}
          <button className='JobApplicationButtons ResumeButton'>
              <Link className='NotificationLinks' to="/image">Edit Profile Picture</Link>
          </button>
        </div>
    </div>
  );
}

export default EditProfile;
