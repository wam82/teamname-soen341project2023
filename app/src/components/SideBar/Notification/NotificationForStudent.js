import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//Notifications for students
function NotificationForStudent() {
  const [notifications, setNotifications] = useState([]);
  const [showOldNotifications, setShowOldNotifications] = useState(false);

  //fetches all the jobs
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:5000/notifications/${userId}`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //new notifications are where studentDissmiss is not true and isAccepted is not null.
  //Old notifications are where studentDimiss is true
  const unreadNotifications = notifications.filter(notification => notification.studentDismiss !== true && notification.isAccepted !== null);
  const oldNotifications = notifications.filter(notification => notification.studentDismiss === true);

  //maps notifcations
  //if new notifcation.isAccepted is true, student got accepted,
  //if it is false student got rejected
  //links to jobs

  //if old notification its the same logic...
  return (
    <div className='WholeNotificationContainer'>
      <h2 className='JobListingWordContainer'>Notifications</h2>
      {unreadNotifications.length > 0 ? (
        <div>
          <div className='NotificationContainer'>
            <h3 className='NewNotificationText'>New Notifications</h3>
          </div>
          <ul>
            {unreadNotifications.map((notification) => (
              <li className='NotificationMessages' key={notification.id}>
                {notification.isAccepted ? (
                  <div className='SingleNotification'>
                    <div>
                      Congratulations! You were accepted for the job interview for job  
                    </div> 
                    <button className='JobApplicationButtons'>
                      <Link className='NotificationLinks' to={`/jobs/${notification.jobId}`}>View Job Details</Link>
                    </button>
                  </div>
                ) : (
                  <div className='SingleNotification'>
                    <div>
                      You were rejected for the job interview for job 
                    </div>
                    <button className='JobApplicationButtons'>
                      <Link className='NotificationLinks' to={`/jobs/${notification.jobId}`}>View Job Details</Link>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='NotificationContainer'>
          <h3 className='NewNotificationText'>No New Notifications</h3>
        </div>
      )}
      <div className='ShowNotificationButton'>
        <button className='JobApplicationButtons' onClick={() => setShowOldNotifications(!showOldNotifications)}>
          {showOldNotifications ? 'Hide' : 'Show'} Old Notifications
        </button>
      </div>
      {showOldNotifications && (
        <div className='NotificationText'>
          <div className='NotificationContainer'>
            <h3 className='NewNotificationText'>Old Notifications</h3>
          </div>
          {oldNotifications.length > 0 ? (
            <ul>
              {oldNotifications.map((notification) => (
                <li className='NotificationMessages' key={notification.id}>
                  {notification.isAccepted ? (
                    <div className='SingleNotification'>
                      <div>
                        Congratulations! You were accepted for the job interview for job  
                      </div> 
                      <button className='JobApplicationButtons'>
                        <Link className='NotificationLinks' to={`/jobs/${notification.jobId}`}>
                          View Job Details
                        </Link>
                      </button>
                    </div>
                  ) : (
                    <div className='SingleNotification'>
                      <div>
                        You were rejected for the job interview for job 
                      </div>
                      <button className='JobApplicationButtons'>
                        <Link className='NotificationLinks' to={`/jobs/${notification.jobId}`}>View Job Details</Link>
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className='NotificationContainer'>
              <h3 className='NewNotificationText'>No Old Notifications</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationForStudent;
