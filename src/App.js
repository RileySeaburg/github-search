import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/pages/about";
import Home from "./components/pages/home";
import NotFound from "./components/pages/notFound";
import AlertState from "./context/alert/AlertState";
import GithubState from "./context/github/GithubState";

import "./App.css";
// Global State
const App = () => {
  return (
    <AlertState>
      <GithubState>
        <Router>
          <div className="app">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    </AlertState>
  );
};
export default App;
