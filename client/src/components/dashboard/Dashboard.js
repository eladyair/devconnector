import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';

const Dashboard = ({ getCurrentProfile, profile: { profile, loading }, auth: { user } }) => {
    // As soon as the dahboard loads we make a call to get the user profile
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <Fragment>Has</Fragment>
            ) : (
                <Fragment>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
