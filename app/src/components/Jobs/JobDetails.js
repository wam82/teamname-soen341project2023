import React from 'react';
import { Redirect } from 'react-router-dom';
import JobDetailsForStudent from './Student/JobDetailsForStudent';
import JobDetailsForEmployer from './Employer/JobDetailsForEmployer';
import JobDetailsForAdmin from './Admin/JobDetailsForAdmin';


//Render correct JobDetails page accourding to userType. Take props and send prop
function JobDetails(props) {
  const userType = localStorage.getItem('userType');

  if (userType === 'STUDENT') {
    return <JobDetailsForStudent {...props} />;
  } else if (userType === 'EMPLOYER') {
    return <JobDetailsForEmployer {...props} />;
  } else if (userType === 'ADMIN') {
    return <JobDetailsForAdmin {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default JobDetails;
