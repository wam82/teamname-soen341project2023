import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./components/Header/Header";
import './components/Header/Header.css';

import LoginPage from "./LoginPage/LoginPage";
import './LoginPage/LoginPage.css';

import Posts from "./components/posts/Posts";
import Home from "./home/home";
import Single from './components/single/Single';
import Write from './components/Write/Write';


import {Register} from "./Register/Register";
import './Register/Register.css'

function App() {
  const user = false; // if user is login, this value is true, for now the value is always true
  return (
    <>
      <Header />
     <Register />
    </>
  );
}

export default App;
