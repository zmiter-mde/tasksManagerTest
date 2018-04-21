import { TOKEN } from './constants';

export const CONTEXT = process.env.AUTH_API;

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 400) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;

        if(response.status === 401 && (!response.url.includes('login'))) {
        }
        throw error;
    }
};

const parseJSON = (response) => response.json();

const getHeaders = () => {
    const headers = {};
    /*
    if (getToken()) {
        headers['Authorization'] = `Bearer ${ getToken() }`;
    }
    */
    return headers;
};

export const api = {
    'get': (url, additionalHeaders) => {
        return fetch(`${CONTEXT}${url}`, {
            method: 'GET',
            headers: {...getHeaders(), ...additionalHeaders}
        }).then(checkStatus).then(parseJSON)
    },
    'put': (url, body, additionalHeaders) => {
        return fetch(`${CONTEXT}${url}`, {
            method: 'PUT',
            headers: {...getHeaders(), ...additionalHeaders},
            body: JSON.stringify(body)
        }).then(checkStatus).then(parseJSON);
    },
    'post': (url, body, additionalHeaders) => {
        return fetch(`${CONTEXT}${url}`, {
            method: 'POST',
            headers: {...getHeaders(), ...additionalHeaders},
            body: body,
            mode: 'cors'
        }).then(checkStatus).then(parseJSON);
    },
    'delete': (url, additionalHeaders) => {
        return fetch(`${CONTEXT}${url}`, {
            method: 'DELETE',
            headers: {...getHeaders(), ...additionalHeaders}
        }).then(checkStatus).then(parseJSON)
    }
};
/*eslint-enable no-undef*/