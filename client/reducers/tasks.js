import * as actionTypes from '../actions/actionTypes';

export const tasksReducer = (
    state = {
        tasks: [],
        newTask: {},
        currentTask: {}
    },
    action = {}
) => {
    switch (action.type) {
        case actionTypes.TASKS_REQUESTED:
            return {
                ...state,
                tasks: action.data.tasks,
                totalTaskCount: +action.data.total_task_count
            };
        case actionTypes.TASK_CREATED:
            return {
                ...state,
                newTask: action.newTask
            };
        case actionTypes.TASK_CHOSEN:
            return {
                ...state,
                currentTask: action.currentTask
            };
        default:
            return state;
    }

};