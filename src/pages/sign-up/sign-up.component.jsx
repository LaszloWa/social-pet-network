import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import InputField from '../../components/input-field/input-field.component';

import './sign-up.styles.scss';

const SignUpPage = () => {
    const [userCredentials, setUserCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword:'' });

    const passwordMinLength = 6; // Sets minimum password length for application

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserCredentials({...userCredentials, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert(`Passwords don't match`);
            return;
        } else if (password.length < passwordMinLength)  { // Checks for password minimum length
            alert(`The password must have a minimum length of ${passwordMinLength}.`);
            return;
        }

        console.log('Hurray, it works')
    }

    return (
        <div className="sign-up">
            <h2 className="title">Sign Up</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <div>
                <InputField 
                        labelName="Displayname"
                        type="text"
                        id="displayName"
                        name="displayName"
                        placeholder="Displayname"
                        value={displayName} 
                        handleChange={handleChange} 
                    />
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
                    <InputField 
                        labelName="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword} 
                        handleChange={handleChange} 
                    />
                </div>
                <button type="submit" className="form-submit">Sign In</button>
            </form>
            <div className="">
                <p>
                    Already have a user? Sign in <Link className="sign-in-page" to="/signin" > here </Link>.
                </p>
            </div>
        </div>
    )
};

export default SignUpPage;