import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = loginData;

    const onChange = e => setLoginData({ ...loginData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        console.log('Success');
    };

    return (
        <Fragment>
            <div className='alert alert-danger'>Invalid Credentials</div>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign into your account
            </p>
            <form onSubmit={e => onSubmit(e)} className='form'>
                <div className='form-group'>
                    <input type='email' placeholder='Email Address' name='email' value={email} onChange={e => onChange(e)} />
                </div>
                <div className='form-group'>
                    <input type='password' placeholder='password' name='password' value={password} onChange={e => onChange(e)} minLength='6' />
                </div>
                <input type='submit' value='Login' className='btn btn-primary' />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='./register'>Sign UP</Link>
            </p>
        </Fragment>
    );
};

export default Login;
