import { takeLatest, fork, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import routes from 'routes';
import { Types, signUp, signUpResponse, loading, verifyResponse, signInResponse } from 'store/actions/auth';
import * as api from 'services/auth';


function* fetchSignUpData({ payload }) {
    try {
        yield put(loading(true));

        const response = yield call(api.SignUp, payload)

        yield put(loading(false));
        yield put(push(routes.confirm));

    } catch (error) {
        yield put(signUpResponse(error.response.data));
        yield put(loading(false));
    }
}

function* watchSignUpData() {
    yield takeLatest(Types.SIGNUP, fetchSignUpData)
}

function* fetchSignInData({ payload }) {
    try {
        yield put(loading(true));

        const response = yield call(api.SignIn, payload)

        yield put(signInResponse({ token: response.data.token, email: payload.email }));
        yield put(loading(false));
        yield put(push(routes.list));

    } catch (error) {
        yield put(signUpResponse(error.response.data));
        yield put(loading(false));
    }
}

function* watchSignInData() {
    yield takeLatest(Types.SIGNIN, fetchSignInData)
}

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* fetchVerifyCodeData({ payload }) {
    try {
        yield put(loading(true));

        const response = yield call(api.VerifyCode, payload)

        yield put(loading(false));
        yield put(verifyResponse(response.data));
        yield call(delay, 2000);
        yield put(push(routes.login));

    } catch (error) {
        yield put(signUpResponse(error.response.data));
        yield put(loading(false));
    }
}

function* watchVerifyCodeData() {
    yield takeLatest(Types.VERIFY_CODE, fetchVerifyCodeData)
}

const DataSagas = [
    fork(watchSignUpData),
    fork(watchVerifyCodeData),
    fork(watchSignInData),
];

export default DataSagas;
