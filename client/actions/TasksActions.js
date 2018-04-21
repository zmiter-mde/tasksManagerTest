import * as actionTypes from '../actions/actionTypes';
import { actions } from 'react-redux-form';

import { api } from '../utils/api';

import {
    DEVELOPER_NAME_PARAM,
    SERVER_TOKEN,
    STATUS,
    SIGNATURE,
    SERVER_TOKEN_FIELD,
    TEXT
} from '../utils/constants';

import { createSignature } from '../utils/auth';

export const requestTasks = (page, sorting) => (
    (dispatch) => {
        return api.get(
            `/?${DEVELOPER_NAME_PARAM}&page=${page}&sort_field=${sorting.field}&sort_direction=${sorting.direction}`
        ).then(json => {
            dispatch({ type: actionTypes.TASKS_REQUESTED, data: json.message });
        });
    }
);

export const createTask = (task) => (
    (dispatch) => {
        return api.post(
            `/create?${DEVELOPER_NAME_PARAM}`,
            task
        ).then(json => {
            dispatch({ type: actionTypes.TASK_CREATED, newTask: json.message});
            return Promise.resolve(json);
        });
    }
);

export const setTaskToView = (task) => (
    (dispatch) => {
        dispatch({ type: actionTypes.TASK_CHOSEN, currentTask: task});
    }
);

export const setTaskForEdit = (task) => (
    (dispatch) => {
        dispatch(actions.change('editTaskForm', task));
    }
);

export const editTask = (task) => (
    (dispatch) => {
        let data = new FormData();
        data.append(STATUS, task.status);
        data.append(TEXT, task.text);
        data.append(SERVER_TOKEN_FIELD, SERVER_TOKEN);
        data.append(SIGNATURE, createSignature(task));

        return api.post(
            `/edit/${task.id}?${DEVELOPER_NAME_PARAM}`,
            data
        ).then(json => {
            dispatch(actions.change('tasksReducer.tasks', []));
            return Promise.resolve(json);
        });
    }
);

export const setNewTaskStatus = (newStatus) => (
    (dispatch) => {
        dispatch(actions.change('editTaskForm.status', newStatus));
    }
);
