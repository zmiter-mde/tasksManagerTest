export const CONTEXT = process.env.AUTH_API;

const parseJSON = (response) => response.json();

export const api = {
    'get': (url, additionalHeaders) => {
        return fetch(`${CONTEXT}${url}`, {
            method: 'GET',
            headers: {...additionalHeaders}
        }).then(parseJSON)
    },
    'post': (url, body, additionalHeaders) => {
        return fetch(`${CONTEXT}${url}`, {
            method: 'POST',
            headers: {...additionalHeaders},
            body: body,
            mode: 'cors'
        }).then(parseJSON);
    },
};