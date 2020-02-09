import {takeLatest, call, put, debounce} from 'redux-saga/effects'
import { movieTypes, movieActions } from './movieAction'
import movieApi from 'core/services/api-service'

const limitMovies = 12;

function extractMesssageError(e) {
    let messageError = e && e.message;
    if (e.response && e.response.data) {
        messageError = e.response.data.status_code + ' - ' + e.response.data.status_message;
    }
    return messageError;
}

function* findMostPopularAsync() {
    try {
        const response = yield call(movieApi.get, '/movie/popular') ;
        
        yield put(movieActions.findMostPopularSuccess([].concat(response.data.results).slice(0, limitMovies)))
    } catch(e) {
        const messageError = extractMesssageError(e);
        yield put(movieActions.findMostPopularError(messageError))
    }
    
}

function* findSearchTermAsync(action) {
    try {
        const searchTerm = action.payload.searchTerm;
        
        if(!action.payload.isShowingFavorites) {
            const response = yield call(movieApi.get, '/search/movie?query=' + searchTerm) ;
            yield put(movieActions.findSearchTermSuccess(response.data.results))
        }else{
            let favoriteMoviesLocalStorage = JSON.parse(localStorage.getItem('favoriteMovies'));
            if(favoriteMoviesLocalStorage) {
                let favoriteMovies = favoriteMoviesLocalStorage.movies
                favoriteMovies = favoriteMovies.filter(fm => {
                    return fm.title && fm.title.toLowerCase().includes(searchTerm.toLowerCase());
                })
                yield put(movieActions.findSearchTermSuccess(favoriteMovies))
            }
        }
        
    } catch(e) {
        const messageError = extractMesssageError(e);
        yield put(movieActions.findSearchTermError(messageError))
    }
}

export function* movieSagaActionWatcher() {
    yield takeLatest(movieTypes.FIND_MOST_POPULAR, findMostPopularAsync)
    yield debounce(300, movieTypes.FIND_SEARCH_TERM, findSearchTermAsync)
}