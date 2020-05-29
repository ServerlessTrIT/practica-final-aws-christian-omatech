import { all } from 'redux-saga/effects'
import AuthSaga from './auth';
import BookSaga from './books';

export default function* rootSaga() {
    yield all([
        ...AuthSaga,
        ...BookSaga
    ])
}
