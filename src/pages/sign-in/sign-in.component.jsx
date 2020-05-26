import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import InputField from '../../components/input-field/input-field.component';

import './sign-in.styles.scss';

const SignInPage = () => {
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''});

    const { email, password } = userCredentials;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserCredentials({...userCredentials, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className="sign-in">
            <h2 className="title">Sign In</h2>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <div>
                    <InputField 
                        labelName="Email"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email} 
                        handleChange={handleChange} 
                    />
                    <InputField 
                        labelName="Password"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password} 
                        handleChange={handleChange} 
                    />
                </div>
                <button type="submit" className="form-submit">Sign In</button>
            </form>
            <div className="">
                <p>Don't have a user yet? Sign up <Link className="sign-up-page" to="/signup" > here </Link>.</p>
            </div>
        </div>
    )
};

export default SignInPage;