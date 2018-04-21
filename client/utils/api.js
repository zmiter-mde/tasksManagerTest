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

export const api = {
    'get': (url, additionalHeaders) => {
        return fetch(`${CONTEXT}${url}`, {
            method: 'GET',
            headers: {...additionalHeaders}
        }).then(checkStatus).then(parseJSON)
    },
    'post': (url, body, additionalHeaders) => {
        return fetch(`${CONTEXT}${url}`, {
            method: 'POST',
            headers: {...additionalHeaders},
            body: body,
            mode: 'cors'
        }).then(checkStatus).then(parseJSON);
    },
};