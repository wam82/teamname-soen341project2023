import React from 'react';

import Header from "./Header/Header";
import './Header/Header.css';

import LoginPage from "./LoginPage/LoginPage";
import './LoginPage/LoginPage.css'
import Manage_Profile from './ManagingStudentProfile/Manage_Profile';

function App() {
  return (
    <>
      <Header />
      <LoginPage />
    </>
  );
}

export default App;
