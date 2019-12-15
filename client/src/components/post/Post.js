import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Components
import PostItem from '../posts/PostItem';
import Spinner from '../layouts/Spinner';
// Actions
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to='/posts' className='btn'>
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
