import FavoriteMovieProvider from "core/contexts/favorite-movie/favoriteMovieProvider";
import { movieActions } from "core/redux/movie/movieAction";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../loading/loading";
import MovieCard from "./movie-card/movie-card";
import MovieModal from "./movie-modal/movie-modal";
import styles from "./movies-list.module.scss";

const MySwal = withReactContent(Swal);

function determineHeader(searchTerm, showingFavorites) {
  console.log(searchTerm)
  if (searchTerm && searchTerm.length > 0) {
    return 'Search results for: "' + searchTerm + '"';
  } else if(showingFavorites) {
    return "Favorites";
  } else {
    return "Most Popular";
  }
}

const openSwal = (movie) => {
  MySwal.fire({
    html: <MovieModal movie={movie} closeModalCallBack={MySwal.close} />,
    showConfirmButton: false
  });
};

function determineMoviesListElement({ loading, movies, error, errorObj }) {
  if (loading) {
    return <Loading />;
  } else if(error) {
    return <div className="text-center text-3xl mt-20 text-red-500">{errorObj}</div>;
  } else if (movies && movies.length > 0) {
    return (
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {movies
            .map((movie, index) => (
              <MovieCard key={index} movie={movie} openSwal={openSwal} />
            ))}
      </div>
    );
  } else {
    return <div className="text-center text-3xl mt-20">No results found.</div>;
  }
}

const MoviesList = ({ dispatch, movieState }) => {
  useEffect(() => {
    dispatch(movieActions.findMostPopular());
  }, [dispatch]);

  const { searchTerm, showingFavorites } = movieState;

  return (
      <div className={[styles.moviesListWrapper, "px-40 py-5"].join(" ")}>
        <h2 className={styles.pageHeader}>{determineHeader(searchTerm, showingFavorites)}</h2>

        {determineMoviesListElement(movieState)}
      </div>
  );
};

const mapStateToProps = state => ({
  movieState: state.movieReducer
});

export default connect(mapStateToProps)(MoviesList);
