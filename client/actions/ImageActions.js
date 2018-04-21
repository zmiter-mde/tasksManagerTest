import * as actionTypes from '../actions/actionTypes';

export const changeImage = (newImage) => (
    (dispatch) => {
        dispatch({ type: actionTypes.IMAGE_CHANGED, newImage: newImage});
    }
);
