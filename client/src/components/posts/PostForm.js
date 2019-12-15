import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Actions
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');

    return (
        <div className='post-form'>
            <div className='post-form-header bg-primary'>
                <h3>Say Something...</h3>
            </div>
            <form
                className='form my-1'
                onSubmit={e => {
                    e.preventDefault();
                    addPost({ text });
                    setText('');
                }}
            >
                <textarea
                    name='text'
                    placeholder='Create a post'
                    cols='30'
                    rows='5'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
