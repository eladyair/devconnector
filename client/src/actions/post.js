import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            action: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};

// Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/post/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            action: { id: postId, likes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};

// Remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/post/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            action: { id: postId, likes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};

// delete post
export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/${postId}`);

        dispatch({
            type: DELETE_POST,
            action: postId
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statustext, status: error.response.status }
        });
    }
};
