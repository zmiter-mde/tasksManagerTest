import * as actionTypes from '../actions/actionTypes';

import { api } from '../utils/api';

import { DEVELOPER_NAME_PARAM } from '../utils/constants';

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

export const chooseTask = (task) => (
    (dispatch) => {
        dispatch({ type: actionTypes.TASK_CHOSEN, currentTask: task});
    }
);