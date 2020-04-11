import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
// Import types
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from "../types";
const GithubState = (props) => {
  const initalState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initalState);

  // Search User  (Callback Function Also Arrow & Async)
  const searchUsers = async (text) => {
    // Update Loading State
    setLoading();
    // Make API Call
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHIB_CLIENT_ID}&clien_secret=${process.env.REACT_APP_GITHIB_CLIENT_SECRET}`
    );
    // Update users state with API data
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };
  // Get User
  const getUser = async (username) => {
    // Update Loading State
    setLoading();
    // Make API Call
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHIB_CLIENT_ID}&clien_secret=${process.env.REACT_APP_GITHIB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };
  // Get Repos
  const getUserRepos = async (username) => {
    // Update Loading State
    setLoading();
    // Make API Call
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHIB_CLIENT_ID}&clien_secret=${process.env.REACT_APP_GITHIB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };
  // Clear Users

  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
