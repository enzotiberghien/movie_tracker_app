import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  watched: [],
  user: JSON.parse(localStorage.getItem("user"))|| null
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);


  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };


  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const setWatched = (watched) => {
    dispatch({ type: "SET_WATCHED", payload: watched });
  };

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        watched: state.watched,
        addMovieToWatched,
        removeFromWatched,
        setUser,
        setWatched
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};