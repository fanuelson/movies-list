import { all } from 'redux-saga/effects';
import { movieSagaActionWatcher } from './movie/movieSaga';

function* rootSaga() {
    yield all([
        movieSagaActionWatcher()
    ]);
}
export default rootSaga;