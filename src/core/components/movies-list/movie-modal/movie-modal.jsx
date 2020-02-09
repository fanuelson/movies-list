import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'
import styles from './movie-modal.module.scss'
import {imageConstants} from '../constants/image.constants'

function getMovieImage(movieImage) {
  if(movieImage) {
    return 'https://image.tmdb.org/t/p/original/' + movieImage ;
  }else{
    return imageConstants.imageNotFoundUrl;
  }
}

function MovieModal ({ movie, closeModalCallBack }) {
  return (
    <div className='flex flex-row'>
      <div className='flex-initial'>
        <img className={styles.movieImage} src={getMovieImage(movie.poster_path)} alt="Movie banner" />
      </div>

      <div className='m-5 flex-auto'>
        <div className='float-right cursor-pointer' onClick={() => { closeModalCallBack() }}>
          <CloseIcon fontSize='large' />
        </div>

        <div className='m-10 text-left'>
          <div className={styles.modalTitlesLabel}>title</div>
          <div className={[styles.modalTitleValue, 'mt-2'].join(' ')}>{movie.title}</div>

          <div className={[styles.modalTitlesLabel, 'mt-12'].join(' ')}>overview</div>
          <div className={[styles.modalOverviewText, 'mt-2'].join(' ')}>{movie.overview}</div>
        </div>

        <div className={[styles.usersScoreWrapper, 'float-right'].join(' ')} >
          <div className={styles.usersScoreText} >
            User Scores
          </div>
          <div className={[styles.usersScoreCircle, 'float-right'].join(' ')}>
            {movie.vote_average}
          </div>
        </div>
          
      </div>

    </div>
  )
}

MovieModal.propTypes = {
  movie: PropTypes.any.isRequired,
  closeModalCallBack: PropTypes.func.isRequired
}

export default MovieModal
