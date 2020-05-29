export const Types = {
    SIGNUP: 'signup',
    SIGNUP_RESPONSE: 'signup_response',
    LOADING: 'loading',
    VERIFY_CODE: 'verify_code',
    VERIFY_RESPONSE: 'verify_response',
    SIGNIN: 'signin',
    SIGNIN_RESPONSE: 'signin_response',
    LIST_BOOKS: 'list_books',
    GET_BOOKS: 'get_books',
    DELETE_BOOKS: 'delete_books',
    UPDATE_BOOKS: 'update_books',
    CREATE_BOOKS: 'create_books',
}

export const list = () => ({
    type: Types.LIST_BOOKS
})

export const deleteBook = (payload) => ({
    type: Types.DELETE_BOOKS,
    payload: payload
})

export const updateBook = (payload) => ({
    type: Types.UPDATE_BOOKS,
    payload: payload
})

export const createBook = (payload) => ({
    type: Types.CREATE_BOOKS,
    payload: payload
})

export const getBooks = (payload) => ({
    type: Types.GET_BOOKS,
    payload: payload
})

export const signUp = (payload) => ({
    type: Types.SIGNUP,
    payload: payload
})

export const signIn = (payload) => ({
    type: Types.SIGNIN,
    payload: payload
})

export const signInResponse = (payload) => ({
    type: Types.SIGNIN_RESPONSE,
    payload: payload
})

export const signUpResponse = (payload) => ({
    type: Types.SIGNUP_RESPONSE,
    payload: payload
})

export const verifyResponse = (payload) => ({
    type: Types.VERIFY_RESPONSE,
    payload: payload
})

export const verifyCode = (payload) => ({
    type: Types.VERIFY_CODE,
    payload: payload
})

export const loading = (payload) => ({
    type: Types.LOADING,
    payload: payload
})
