import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Exam from './Components/Exam/Exam';
import Library from './Components/Library/Library';
import TPO from './Components/TPO/TPO';
import Events from './Components/Events/Events';
import Profile from './Components/Profile/Profile';
import Footer from './Components/Footer/Footer';
import PageNotFound from './Components/ErrorPage/PageNotFound'
import About from './Components/About/About'
import Department from './Components/Department/Department';
import Login from './Components/Login/Login';


function App() {

  const [userID, setUserID] = useState(localStorage.getItem("UserID"));
  const [usersInfo, setUsersInfo] = useState([]);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("UserID"));
  const [ok, setOk] = useState(false);


  // fetch profile whenever userID changes:
  useEffect(() => {
    if (!userID) return; // don't fetch if not logged in
    const fetchdata = async () => {
      try {
        const response = await axios.post("https://notify-u-student-module.onrender.com/api/getProfile", { userID });
        setUsersInfo(response.data);
        setOk(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [userID]);


  const handleLogin = (id) => {
    localStorage.setItem("UserID", id);
    setUserID(id);
    setLoggedIn(true);
  }

  const handleLogout = () => {
    localStorage.setItem("UserID", "");
    setUserID(null);
    setLoggedIn(false);
    setOk(false);
  }


  return (
    <Router>
      <Switch>

        <Route exact path="/">
          {(loggedIn && ok) ? (
            <><NavBar /><Home usersInfo={usersInfo} userID={userID} /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <Route exact path="/Components/Department/Department">
          {(loggedIn && ok) ? (
            <><NavBar /><Department usersInfo={usersInfo} userID={userID} /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <Route exact path="/Components/Exam/Exam">
          {(loggedIn && ok) ? (
            <><NavBar /><Exam usersInfo={usersInfo} userID={userID} /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <Route exact path="/Components/Library/Library">
          {(loggedIn && ok) ? (
            <><NavBar /><Library usersInfo={usersInfo} userID={userID} /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <Route exact path="/Components/TPO/TPO">
          {(loggedIn && ok) ? (
            <><NavBar /><TPO usersInfo={usersInfo} userID={userID} /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <Route exact path="/Components/Events/Events">
          {(loggedIn && ok) ? (
            <><NavBar /><Events /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <Route exact path="/Components/Profile/Profile">
          {(loggedIn && ok) ? (
            <><NavBar /><Profile usersInfo={usersInfo} onLogout={handleLogout} userID={userID} /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <Route exact path="/Components/About/About">
          {(loggedIn && ok) ? (
            <><NavBar /><About /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

        <Route path="*">
          {(loggedIn && ok) ? (
            <><NavBar /><PageNotFound /><Footer /></>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>

      </Switch>
    </Router>
  );
}

export default App;