import Header from "core/components/header/header";
import MoviesList from "core/components/movies-list/movies-list.jsx";
import store from "core/redux/store";
import React from "react";
import { Provider } from "react-redux";
import FavoriteMovieProvider from "core/contexts/favorite-movie/favoriteMovieProvider";

function App() {
  return (
    <Provider store={store}>
      <FavoriteMovieProvider>
        <Header />

        <MoviesList />
      </FavoriteMovieProvider>
    </Provider>
  );
}

export default App;
