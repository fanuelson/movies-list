export const movieTypes = {
    FIND_MOST_POPULAR: 'movieTypes/FIND_MOST_POPULAR',
    FIND_MOST_POPULAR_SUCCESS: 'movieTypes/FIND_MOST_POPULAR_SUCCESS',
    FIND_MOST_POPULAR_FAILURE: 'movieTypes/FIND_MOST_POPULAR_FAILURE',
    FIND_SEARCH_TERM: 'movieTypes/FIND_SEARCH_TERM',
    FIND_SEARCH_TERM_SUCCESS: 'movieTypes/FIND_SEARCH_TERM_SUCCESS',
    FIND_SEARCH_TERM_FAILURE: 'movieTypes/FIND_SEARCH_TERM_FAILURE',
    FIND_FAVORITE_MOVIES: 'movieTypes/FIND_FAVORITE_MOVIES'
}

export const movieActions = {
    findMostPopular: () => ({ type: movieTypes.FIND_MOST_POPULAR }),
    findMostPopularSuccess: (movieList) => ({type: movieTypes.FIND_MOST_POPULAR_SUCCESS, payload: movieList}),
    findMostPopularError: (errorObject) => ({type: movieTypes.FIND_MOST_POPULAR_FAILURE, payload: errorObject}),
    findSearchTerm: (searchTerm, isShowingFavorites) => ({ type: movieTypes.FIND_SEARCH_TERM, payload: {searchTerm, isShowingFavorites} }),
    findSearchTermSuccess: (movieList) => ({type: movieTypes.FIND_SEARCH_TERM_SUCCESS, payload: movieList}),
    findSearchTermError: (errorObject) => ({type: movieTypes.FIND_SEARCH_TERM_FAILURE, payload: errorObject}),
    findFavorites: (moviesList) => ({ type: movieTypes.FIND_FAVORITE_MOVIES, payload: moviesList }),

}