import axios from 'axios';

const API_KEY = 'OtXBHFhCj7vsc5cCVf2a8isY5UPOGFQ1kHMSkM7c';
const BASE_URL = 'https://5wxgxcz5vl.execute-api.eu-central-1.amazonaws.com/dev/';

export const List = (token) => {
    return axios.get(BASE_URL + 'books', {
        headers: {
            'x-api-key': API_KEY,
            'Authorization': 'Bearer ' + token
        }
    });
}

export const Delete = (token, payload) => {
    return axios.delete(BASE_URL + 'books/' + payload, {
        headers: {
            'x-api-key': API_KEY,
            'Authorization': 'Bearer ' + token
        }
    });
}

export const Update = (token, payload) => {
    const book = {
        title: payload.title,
        image: payload.image,
        synopsis: payload.synopsis
    }
    return axios.put(BASE_URL + 'books/' + payload.isbn, book, {
        headers: {
            'x-api-key': API_KEY,
            'Authorization': 'Bearer ' + token
        }
    });
}

export const Create = (token, payload) => {
    const book = {
        isbn: payload.isbn,
        title: payload.title,
        image: payload.image,
        synopsis: payload.synopsis
    }
    return axios.post(BASE_URL + 'books', book, {
        headers: {
            'x-api-key': API_KEY,
            'Authorization': 'Bearer ' + token
        }
    });
}

export const SignUp = ({ email, password }) => {
    return axios.post(BASE_URL + 'signup', {
        'email': email,
        'password': password
    }, {
        headers: {
            'x-api-key': API_KEY
        }
    });
}

export const SignIn = ({ email, password }) => {
    return axios.post(BASE_URL + 'login', {
        'email': email,
        'password': password
    }, {
        headers: {
            'x-api-key': API_KEY
        }
    });
}

export const VerifyCode = ({ email, code }) => {
    return axios.post(BASE_URL + 'confirm', {
        'email': email,
        'code': code
    }, {
        headers: {
            'x-api-key': API_KEY
        }
    });
}
