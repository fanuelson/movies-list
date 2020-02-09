import Rating from '@material-ui/lab/Rating'
import FavoriteMovieContext from 'core/contexts/favorite-movie/favoriteMovieContext'
import PropTypes from 'prop-types'
import React from 'react'
import { imageConstants } from '../constants/image.constants'
import styles from './movie-card.module.scss'


function getMovieImage(movieImage) {
  if(movieImage) {
    return 'url(https://image.tmdb.org/t/p/w300' + movieImage + ')';
  }else{
    return 'url(' + imageConstants.imageNotFoundUrl + ')';
  }
}

function checkIfMovieIsFavorite(movie, favoriteMoviesIds) {
  return favoriteMoviesIds.includes(movie.id);
}

function MovieCard ({movie, openSwal }) {

  
  
  return (
    <FavoriteMovieContext.Consumer>
        { ({toggleFavorite, ids}) => (
          <div onClick={() => console.log("clickRate11", movie)}
            className={[styles.movieCard, 'w-64 rounded-lg overflow-hidden cursor-pointer'].join(' ')}
            style={{ backgroundImage: getMovieImage(movie.poster_path), backgroundSize: '100% 100%' }} >

            <div className={[styles.starWrapper, 'float-right'].join(' ')} onClick={() => {toggleFavorite(movie);} } >
              {/* <Rating key={movie.id} name='size-large' defaultValue={0} max={1} size='large' 
                value={checkIfMovieIsFavorite(movie, ids)} onChange={() => {toggleFavorite(movie); console.log("clickRate", movie)} } /> */}
              { checkIfMovieIsFavorite(movie, ids) ? 
                <i className={[styles.starChecked, styles.starIcon, 'fa fa-star fa-2x'].join(' ')}></i>
                :
                <i className={[styles.starUnchecked, styles.starIcon, "fa fa-star-o fa-2x"].join(' ')}></i>
              }
              
            </div>
            <div style={{ height: '100%' }} onClick={() => { openSwal(movie) }} />
          </div>
        )}

    </FavoriteMovieContext.Consumer>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.any.isRequired,
  openSwal: PropTypes.func.isRequired
}

export default MovieCard
