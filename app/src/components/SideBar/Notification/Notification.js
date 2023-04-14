import React, { useState, useEffect } from 'react';
import NotificationForEmployer from './NotficationForEmployer';
import NotificationForStudent from './NotificationForStudent';

//Notification system. Implemented for used student and employer. This page renders depending on userType 
function Notification() {
  const [userType, setUserType] = useState('');
  
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    setUserType(userType);
  }, []);

  return (
    <div>
      {userType === 'STUDENT' && <NotificationForStudent />}
      {userType === 'EMPLOYER' && <NotificationForEmployer />}
      {userType && (userType === 'ADMIN' || userType === 'HEADHUNTER') && (
        <p>Your user type does not need the notification system.</p>
      )}

    </div>
  );
}

export default Notification;
