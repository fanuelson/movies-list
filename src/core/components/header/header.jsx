import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { InputAdornment, Input, Button } from '@material-ui/core'

import './header.css'
import { connect } from 'react-redux'
import { movieActions } from 'core/redux/movie/movieAction'
import FavoriteMovieContext from 'core/contexts/favorite-movie/favoriteMovieContext'

const useStyles = makeStyles(theme => ({
  input: {
    width: 300
  },
  buttonWatchList: {
    width: 182,
    height: 35,
    background: '#F6BE00',
    borderRadius: 50,
    textTransform: 'none',
    color: 'white',
    '&:active': {
      background: '#F6BE00'
    },
    '&:hover': {
      background: '#F6BE00'
    }
  },
  buttonWatchListActive: {
    width: 182,
    height: 35,
    background: 'black',
    borderRadius: 50,
    textTransform: 'none',
    color: 'white',
    '&:active': {
      background: 'black'
    },
    '&:hover': {
      background: 'black'
    }
  }
}))

const Header = ({dispatch, movieState}) => {
  const favoriteMoviesContext = useContext(FavoriteMovieContext);
  const [showingFavorites, setShowingFavorites] = useState(false);

  const classes = useStyles()

  function onChangeInputSearch(ev){
    const searchTerm = ev.target.value;

    if(searchTerm && searchTerm.length > 0) {
      dispatch(movieActions.findSearchTerm(ev.target.value, showingFavorites))
    }else if(showingFavorites) {
      dispatch(movieActions.findFavorites(favoriteMoviesContext && favoriteMoviesContext.movies));
    }else{
      dispatch(movieActions.findMostPopular())
    }
  }

  function clickWatchList() {

      if(movieState.searchTerm && movieState.searchTerm.length > 0) {
        dispatch(movieActions.findSearchTerm(movieState.searchTerm, !showingFavorites))
      }else{
        if(showingFavorites) {
          dispatch(movieActions.findMostPopular())
        }else{
          dispatch(movieActions.findFavorites(favoriteMoviesContext && favoriteMoviesContext.movies));
        }
      }

    setShowingFavorites(!showingFavorites);
  }

  return (
    <header className='header fadeIn px-40 py-10'>

      <Input
        onChange={(ev) => { onChangeInputSearch(ev) }}
        className={classes.input} placeholder='Search for a movie...' id='standard-basic'
        endAdornment={
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        }
      />
      <div className='float-right'>
        <Button className={showingFavorites ? classes.buttonWatchListActive : classes.buttonWatchList} variant='contained' onClick={ clickWatchList} >watchlist</Button>
      </div>

    </header>
  )
}

const mapStateToProps = (state) =>({
  movieState: state.movieReducer
})

export default connect(mapStateToProps)(Header)
