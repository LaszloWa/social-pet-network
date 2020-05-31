import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import client from '../../sanity/sanity.utils';

import InputField from '../../components/input-field/input-field.component';

import './sign-up.styles.scss';

const SignUpPage = () => {
    const [userCredentials, setUserCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword:'' });

    const passwordMinLength = 6; // Sets minimum password length for application

    const { displayName, email, password, confirmPassword } = userCredentials;

    console.log(process.env.SANITY_WRITE_TOKEN)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserCredentials({...userCredentials, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert(`Passwords don't match`);
            return;
        } else if (password.length < passwordMinLength)  { // Checks for password minimum length
            alert(`The password must have a minimum length of ${passwordMinLength}.`);
            return;
        }

        console.log('Hurray, it works')

        const user = {
            _type: 'user',
            profileName: displayName,
            userEmail: email,
        }
        
        auth.createUserWithEmailAndPassword(email, password)
            .then(
                data => {
                    client.create(user)
                        .then(res => console.log(`hurray, ${res} was created!`))
                }
            )
            .catch(
                err => console.log('the following error has occurred: ', err)
            )

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