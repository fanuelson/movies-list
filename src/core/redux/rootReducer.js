import { combineReducers } from 'redux';
import movieReducer from './movie/movieReducer';

const rootReducer = combineReducers({
    movieReducer
});

export default rootReducer;