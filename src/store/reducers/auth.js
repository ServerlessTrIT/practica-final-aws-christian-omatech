import { Types } from 'store/actions/auth';


// create initial state for reducers
const INIT_STATE = {
    errors: { message: '' },
    ok: { message: null },
    loading: false,
    token: null,
    email: '',
    books: []
}

export default function data(state = INIT_STATE, action) {

    switch (action.type) {
        case Types.SIGNUP_RESPONSE: {
            return Object.assign({}, state, {
                errors: { message: action.payload.message }
            })
        }
        case Types.SIGNIN_RESPONSE: {
            return Object.assign({}, state, {
                token: action.payload.token,
                email: action.payload.email
            })
        }
        case Types.VERIFY_RESPONSE: {
            return Object.assign({}, state, {
                ok: { message: action.payload.message }
            })
        }
        case Types.LOADING: {
            return Object.assign({}, state, {
                loading: action.payload
            })
        }
        case Types.GET_BOOKS: {
            return Object.assign({}, state, {
                books: action.payload
            })
        }
        default: return state;
    }
}
