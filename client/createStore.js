import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { combineForms } from 'react-redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr'

import { tasksReducer } from './reducers/tasks';
import { taskSearchReducer } from './reducers/taskSearch';
import { imageReducer } from './reducers/image';

import { initialTaskFormState, initialLoginFormState } from './utils/formInitialStates';

const rootReducer = combineForms({
    newTaskForm: initialTaskFormState,
    editTaskForm: initialTaskFormState,
    loginForm: initialLoginFormState,
    tasksReducer: tasksReducer,
    taskSearchReducer: taskSearchReducer,
    imageReducer: imageReducer,
    toastr: toastrReducer
});

export const store = compose(applyMiddleware(thunk))(createStore)(rootReducer);