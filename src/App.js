import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/about";
import axios from "axios";
import GithubState from "./context/github/GithubState";
import "./App.css";
// Global State
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  // Search Users Callback Function Also Arrow & Async
  const searchUsers = async (text) => {
    // Update Loading State
    setLoading(true);
    // Make API Call
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHIB_CLIENT_ID}&clien_secret=${process.env.REACT_APP_GITHIB_CLIENT_SECRET}`
    );
    // Update users state with API data
    setUsers(res.data.items);
    // Update Loading state
    setLoading(false);
  };
  // Get single github user
  const getUser = async (username) => {
    // Update Loading State
    setLoading(true);
    // Make API Call
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHIB_CLIENT_ID}&clien_secret=${process.env.REACT_APP_GITHIB_CLIENT_SECRET}`
    );
    // Update user profile state with API data
    setUser(res.data);
    // Update Loading State
    setLoading(false);
  };
  // Get users repos
  const getUserRepos = async (username) => {
    // Update Loading State
    setLoading(true);
    // Make API Call
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHIB_CLIENT_ID}&clien_secret=${process.env.REACT_APP_GITHIB_CLIENT_SECRET}`
    );
    // Update user repo state with API response
    setRepos(res.data);
    // Update Loading State
    setLoading(false);
  };
  // clear users from state
  const clearUsers = () => {
    // Clear Data
    setUsers([]);
    // Update Loading State
    setLoading(false);
  };
  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 1500);
  };
  return (
    <GithubState>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};
export default App;
