import { actions } from 'react-redux-form';

import { initialLoginFormState } from '../utils/initialState';

export const login = (username, password) => (
    (dispatch) => {
        // Simulating login request
        return new Promise((resolve, reject) => {
            if (username === 'admin' && password === '123') {
                resolve('Some sophisticated token');
            } else {
                reject(new Error('Invalid credentials'));
            }
        });
    }
);

export const clearCredentials = () => (
    (dispatch) => {
        dispatch(actions.change('loginForm', initialLoginFormState));
    }
);
