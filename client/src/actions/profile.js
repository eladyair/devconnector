import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE } from './types';

//Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({ type: CLEAR_PROFILE });

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios(`/api/profile/user/${userId}`);

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

// Get Github repos by username
export const getGithubReposByUserName = userName => async dispatch => {
    try {
        const res = await axios(`/api/profile/github/${userName}`);

        dispatch({
            type: GET_REPOS,
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

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
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

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
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

// Delete Experience
export const deleteExperience = expId => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${expId}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};

// Delete Education
export const deleteEducation = eduId => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${eduId}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};

// Delete Account & Profile
export const deleteAccountWithProfile = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete('/api/profile');

            dispatch({
                type: CLEAR_PROFILE
            });

            dispatch({
                type: ACCOUNT_DELETED
            });

            dispatch(setAlert('Your Account has been permanantly deleted'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statustext, status: error.response.status }
            });
        }
    }
};