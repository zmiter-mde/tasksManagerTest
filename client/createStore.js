import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { combineForms } from 'react-redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'

import { tasksReducer } from './reducers/tasks';
import { taskSearchReducer } from './reducers/taskSearch';
import { imageReducer } from './reducers/image';

const initialNewTaskFormState = {
    text: 'text',
    email: 'email@gmail.com',
    username: 'username'
};

const rootReducer = combineForms({
    newTaskForm: initialNewTaskFormState,
    tasksReducer: tasksReducer,
    taskSearchReducer: taskSearchReducer,
    imageReducer: imageReducer,
    toastr: toastrReducer
});

export const store = compose(applyMiddleware(thunk))(createStore)(rootReducer);