import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

//Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};
