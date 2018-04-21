import * as actionTypes from '../actions/actionTypes';

export const changeTasksPage = (newPage) => (
    (dispatch) => {
        dispatch({ type: actionTypes.PAGE_CHANGED, newPage: newPage});
    }
);

export const changeSortedBy = (newSortedBy) => (
    (dispatch) => {
        dispatch({ type: actionTypes.SORTED_BY_CHANGED, newSortedBy: newSortedBy});
    }
);

export const changeSortedAsc = (newSortedAsc) => (
    (dispatch) => {
        dispatch({ type: actionTypes.SORTED_ASC_CHANGED, newSortedAsc: newSortedAsc});
    }
);

