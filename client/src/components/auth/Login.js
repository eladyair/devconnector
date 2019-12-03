import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = loginData;

    const onChange = e => setLoginData({ ...loginData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        await login(email, password);
    };

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign into your account
            </p>
            <form onSubmit={e => onSubmit(e)} className="form">
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="password" name="password" value={password} onChange={e => onChange(e)} minLength="6" />
                </div>
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="./register">Sign UP</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

// Connecting this component to redux using the connect function
export default connect(mapStateToProps, { login })(Login);
