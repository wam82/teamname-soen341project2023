import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import JobDetails from './components/Jobs/JobDetails';
import withAuth from './components/withAuth/withAuth';
import EditJob from './components/Jobs/Employer/EditJob';
import CreateJob from './components/Jobs/Employer/CreateJob';
import JobApplicantsDetailsForEmployer from './components/Jobs/Employer/JobApplicantsDetailsForEmployer';
import EditProfile from './components/SideBar/Profile/EditProfile';
import Notification from './components/SideBar/Notification/Notification';
import SpecificUser from './components/SideBar/People/SpecificUser';
import EditProfileAddResume from './components/SideBar/Profile/StudentSpecific/EditProfileAddResume';
import EditProfileGeneral from './components/SideBar/Profile/EditProfileGeneralSettings';
import People from './components/SideBar/People/People';
import ManageStudentAccounts from './components/Home/Admin/AdminManaging/ManageStudentAccounts';
import ManageEmployerAccounts from './components/Home/Admin/AdminManaging/ManageEmployerAccounts';
import ManageJobPostings from './components/Home/Admin/AdminManaging/ManageJobPostings';
import ManageJobApplications from './components/Home/Admin/AdminManaging/ManageJobApplications';
import JobApplicantsDetailsForHeadhunter from './components/Jobs/Headhunter/JobApplicantsDetailsForHeadhunter';
import ManageHeadhunterAccounts from './components/Home/Admin/AdminManaging/ManageHeadhunterAccounts';
import CreateCompanyAccount from './components/Home/Admin/AdminManaging/CreateCompanyAccount';
import Register from './components/Login/Register';
import EditProfileAddProfileImage from './components/SideBar/Profile/EditProfileAddProfileImage';

//app
function App() {

  //all the routes of the pages. WithAuth for every page because it checks if isLoggedIn
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={withAuth(Home)} />
        <Route path="/jobs/:id" component={withAuth(JobDetails)} /> {/*Might not need it*/}
        <Route path="/edit-job/:id" component={withAuth(EditJob)} />
        <Route path="/create-job" component={withAuth(CreateJob)} />
        <Route path="/job-applicants-employer/:id" component={withAuth(JobApplicantsDetailsForEmployer)} />
        <Route path="/job-applicants-headhunter/:id" component={withAuth(JobApplicantsDetailsForHeadhunter)} />
        <Route path="/edit-profile" component={withAuth(EditProfile)} />
        <Route path="/notifications" component={withAuth(Notification)} />
        <Route path="/people/:id" component={withAuth(SpecificUser)} />
        
        <Route path="/edit-general-profile" component={withAuth(EditProfileGeneral)} />
        <Route path="/edit-resume" component={withAuth(EditProfileAddResume)} />

        <Route path="/people" component={withAuth(People)} />

        <Route path="/manage-student-accounts" component={withAuth(ManageStudentAccounts)} />
        <Route path="/manage-employer-accounts" component={withAuth(ManageEmployerAccounts)} />
        <Route path="/manage-headhunter-accounts" component={withAuth(ManageHeadhunterAccounts)} />
        <Route path="/manage-job-postings" component={withAuth(ManageJobPostings)} />
        <Route path="/manage-job-applications" component={withAuth(ManageJobApplications)} />
        <Route path="/create-company-account" component={withAuth(CreateCompanyAccount)} />

        <Route path="/image" component={withAuth(EditProfileAddProfileImage)} />

        <Route path="/register" component={Register} />
    


        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;
