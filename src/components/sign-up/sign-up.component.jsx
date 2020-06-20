import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import { writeClient } from '../../sanity/sanity.utils';

import InputField from '../input-field/input-field.component';

import './sign-up.styles.scss';

const SignUpPage = ({ handleUserUpdate }) => {
    const initialUserCredentials = { displayName: '', email: '', password: '', confirmPassword:'' }

    const [userCredentials, setUserCredentials] = useState(initialUserCredentials);

    const passwordMinLength = 6; // Sets minimum password length for application

    const { displayName, email, password, confirmPassword } = userCredentials;

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

        const user = {
            _type: 'user',
            userName: displayName,
            userEmail: email,
            _id: '',
            userId: '',
            userAge: '', 
            userGender: '', 
            userBreed: '', 
            userHobbies: '', 
            userNicknames: '', 
            userBio: '',
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(
                data => {
                    user._id = data.user.uid;
                    user.userId = user._id;
                    writeClient.create(user)
                        .then(res => {
                            handleUserUpdate(res);
                            console.log(res)
                        })                              
                }
            )
            .then(() => setUserCredentials(initialUserCredentials))
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
                <button type="submit" className="form-submit">Sign Up</button>
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