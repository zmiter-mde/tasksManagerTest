import * as actionTypes from '../actions/actionTypes';

export const imageReducer = (
    state = {
        newImage: {
            file: undefined,
            path: ''
        }
    },
    action = {}
) => {
    switch (action.type) {
        case actionTypes.IMAGE_CHANGED:
            return {
                newImage: action.newImage
            };
        default:
            return state;
    }
};