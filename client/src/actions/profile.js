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

// Create or Update profile
export const createProfile = (formData, history, isEdit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(isEdit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!isEdit) {
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(err => {
                dispatch(setAlert(err.msg, 'danger'));
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};
