import { takeLatest, fork, put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import routes from 'routes';
import { Types, getBooks, signInResponse } from 'store/actions/auth';
import * as api from 'services/auth';

const BearerToken = store => store.auth.token;

function* fetchListData() {
    try {
        const token = yield select(BearerToken);
        const response = yield call(api.List, token)
        yield put(getBooks(response.data));
    } catch (error) {
        yield put(getBooks([]));
        yield put(signInResponse({ token: null, email: null }));
        yield put(push(routes.login));
    }
}

function* watchListData() {
    yield takeLatest(Types.LIST_BOOKS, fetchListData)
}

function* fetchDeleteData(payload) {
    try {
        const token = yield select(BearerToken);
        yield call(api.Delete, token, payload.payload)
        const response = yield call(api.List, token)
        yield put(getBooks(response.data));
    } catch (error) {
    }
}

function* watchDeleteData() {
    yield takeLatest(Types.DELETE_BOOKS, fetchDeleteData)
}

function* fetchUpdateData(payload) {
    try {
        const token = yield select(BearerToken);
        yield call(api.Update, token, payload.payload)
        const response = yield call(api.List, token)
        yield put(getBooks(response.data));
    } catch (error) {
    }
}

function* watchUpdateData() {
    yield takeLatest(Types.UPDATE_BOOKS, fetchUpdateData)
}

function* fetchCreateData(payload) {
    try {
        const token = yield select(BearerToken);
        yield call(api.Create, token, payload.payload)
        const response = yield call(api.List, token)
        yield put(getBooks(response.data));
    } catch (error) {
    }
}

function* watchCreateData() {
    yield takeLatest(Types.CREATE_BOOKS, fetchCreateData)
}

const DataSagas = [
    fork(watchListData),
    fork(watchDeleteData),
    fork(watchUpdateData),
    fork(watchCreateData),
];

export default DataSagas;
