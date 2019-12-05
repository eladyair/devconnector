import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const Dashboard = ({ getCurrentProfile, profile, auth }) => {
    // As soon as the dahboard loads we make a call to get the user profile
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return <div>Dashboard</div>;
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
