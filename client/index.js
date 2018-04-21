require('bootstrap/dist/css/bootstrap.min.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { store } from './createStore';

import './shared/globals.scss';

render(
    <Provider store={ store }>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);