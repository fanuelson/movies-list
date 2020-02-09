import { movieTypes } from "./movieAction";

const initialState = {

}

const baseState = {
    loading: true,
    error: null
}

const baseSuccessState = {
    loading: false,
    error: null
}

const baseFailureState = {
    loading: false,
    error: true
}

function movieReducer (prevState = initialState, action) {

    switch (action.type) {
        case movieTypes.FIND_MOST_POPULAR:
            return {...prevState, ...baseState, searchTerm: null, showingFavorites: false}
        case movieTypes.FIND_MOST_POPULAR_SUCCESS:
            return {...prevState, ...baseSuccessState, movies: action.payload}
        case movieTypes.FIND_MOST_POPULAR_FAILURE:
            return {...prevState, ...baseFailureState, errorObj: action.payload}
        case movieTypes.FIND_SEARCH_TERM:
            return {...prevState, ...baseState, searchTerm: action.payload.searchTerm}
        case movieTypes.FIND_SEARCH_TERM_SUCCESS:
            return {...prevState, ...baseSuccessState, movies: action.payload}
        case movieTypes.FIND_SEARCH_TERM_FAILURE:
            return {...prevState, ...baseFailureState, errorObj: action.payload}
        case movieTypes.FIND_FAVORITE_MOVIES:
            return {...prevState, movies: action.payload, showingFavorites: true, searchTerm: null}
        default:
            return prevState;
    }
}


export default movieReducer;