
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./components/Header/Header";
import './components/Header/Header.css';

import LoginPage from "./LoginPage/LoginPage";
import './LoginPage/LoginPage.css';

import Posts from "../src/components/posts/Posts"
import Home from "./home/home";
import Single from './components/single/Single';
import Write from './components/Write/Write';
import Manage_Profile from "./ManagingStudentProfile/Manage_Profile";

function App() {
  const user = true; // if user is login, this value is true, for now the value is always true
  return (
    <>
      <Header />
      <Router>
      <Switch>
        <Route exact path="/">
        {user? <Home/> :<LoginPage/>}
        </Route>
        <Route path="/post/:postId">
          <Single/>
        </Route>
        <Route path="/login">
          {user? <Home/> :<LoginPage/>}
        </Route>
        <Route path="/write">
        {user? <Write/> :<LoginPage/>}
        </Route>
        <Route path="/ManageProfile">
          <Manage_Profile/>
        </Route>
      </Switch>
      </Router>
    </>
  );
}

export default App;
