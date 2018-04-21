import * as actionTypes from '../actions/actionTypes';

import { USERNAME } from '../utils/constants';

export const taskSearchReducer = (
    state = {
        currentPage: 1,
        sortedBy: USERNAME,
        sortedAsc: true
    },
    action = {}
) => {
    switch (action.type) {
        case actionTypes.PAGE_CHANGED:
            return {
                ...state,
                currentPage: action.newPage
            };
        case actionTypes.SORTED_BY_CHANGED:
            return {
                ...state,
                sortedBy: action.newSortedBy
            };
        case actionTypes.SORTED_ASC_CHANGED:
            return {
                ...state,
                sortedAsc: action.newSortedAsc
            };
        default:
            return state;
    }

};