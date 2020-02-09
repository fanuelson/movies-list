import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FavoriteMovieContext from './favoriteMovieContext'

const STORAGE_MOVIES_KEY = 'favoriteMovies';

function removeFavoriteMovie(newState, movieIndex) {
    newState.ids.splice(movieIndex, 1);
    newState.movies.splice(movieIndex, 1);
}

function addFavoriteMovie(newState, movie) {
    newState.ids.push(movie.id);
    newState.movies.push(movie);
}

function getInitialState() {
    let initialState = localStorage.getItem(STORAGE_MOVIES_KEY);
    if(initialState) {
        initialState = JSON.parse(initialState);
    }else{
        initialState = {ids: [], movies: []};
    }
    return initialState
}

const FavoriteMovieProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState(getInitialState());


  const toggleFavorite = (movie) => {

    const movieIndex = favoriteMovies.ids.indexOf(movie.id);
    let newState = {...favoriteMovies};
    if(movieIndex > -1) {
        removeFavoriteMovie(newState, movieIndex, setFavoriteMovies);
    }else{
        addFavoriteMovie(newState, movie, setFavoriteMovies);
    }

    setFavoriteMovies(newState);

    localStorage.setItem(STORAGE_MOVIES_KEY, JSON.stringify(newState));
  }

  return (
    <FavoriteMovieContext.Provider
      value={{
        ...favoriteMovies,
        toggleFavorite
      }}
    >
      {children}
    </FavoriteMovieContext.Provider>
  )
}

FavoriteMovieProvider.propTypes = {
  children: PropTypes.any
}

export default FavoriteMovieProvider




