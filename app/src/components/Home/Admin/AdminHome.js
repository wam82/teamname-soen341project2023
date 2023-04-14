import React from 'react';
import { Link } from 'react-router-dom';



//Links to five managing pages
function AdminHome() {
  return (
    <div>
      <h2 className='JobListingWordContainer'>Admin Home</h2>
      <ul>
        <li>
          <Link className='ButtonStyleLinks AdminLinks' to="/manage-student-accounts">Manage student accounts</Link>
        </li>
        <li>
          <Link className='ButtonStyleLinks AdminLinks' to="/manage-employer-accounts">Manage employer accounts</Link>  
        </li>
        <li>
          <Link className='ButtonStyleLinks AdminLinks' to="/manage-headhunter-accounts">Manage headhunter accounts</Link>    
        </li>
        <li>  
          <Link className='ButtonStyleLinks AdminLinks' to="/manage-job-postings">Manage job postings</Link>
        </li>
        <li>
          <Link className='ButtonStyleLinks AdminLinks' to="/manage-job-applications">Manage job applications</Link> 
        </li>
        <li>
          <Link className='ButtonStyleLinks AdminLinks' to="/create-company-account">Create an Admin or a Headhunter account</Link>  
        </li>
      </ul>
    </div>
  );
}


export default AdminHome;
