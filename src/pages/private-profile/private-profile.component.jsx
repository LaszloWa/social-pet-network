import React, { useState } from 'react';

import ProfilePic from '../../components/profile-pic/profile-pic.component';
import InputField from '../../components/input-field/input-field.component';

import client from '../../sanity/sanity.utils';

import './private-profile.styles.scss';

const PrivateProfilePage = ({ currentUser }) => {
    const [userProfile, setUserProfile] = useState(currentUser)

    // const [userProfile, setUserProfile] = useState({profileName: '', profileAge: '', profileGender: '', profileBreed: '', profileHobbies: '', profileNicknames: '', profileBio: ''});

    const { userName, userAge, userGender, userBreed, userHobbies, userNicknames, userBio, _id } = userProfile;

    const handleChange = (event) => {
        const {name, value } = event.target



        setUserProfile({...userProfile, [name]: value})

        console.log(userProfile)
    };

    const handleDiscard = (event) => {
        // TODO: reset state to state fetched from DB
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        client
            .patch(`${_id}`)
            .set(userProfile)
            .commit()
            .then(res => console.log('The new doc looks like: ' + res))
            .catch(err => console.log('You messed up' + err))
    };

   return (
        <div>
            <div className="profile-pic">
                <ProfilePic height={200} width={200} />
            </div>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="profile-header">
                    <InputField
                        labelName="Name"
                        type="text"
                        id="name"
                        name="userName"
                        placeholder="Name"
                        value={userName} 
                        handleChange={handleChange} 
                    />
                    <div>
                        <label htmlFor="userBio" >Bio: </label>
                        <textarea       
                            className="profile-description"
                            placeholder="Pet bio"
                            name="userBio"
                            id="userBio"
                            value={userBio}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="about-me-section">
                    <h3>About me</h3>
                    <InputField 
                        labelName="Age"
                        type="number"
                        min="0"
                        id="age"
                        name="userAge"
                        placeholder="Age"
                        value={userAge}
                        handleChange={handleChange}
                    />
                    <InputField 
                        labelName="Gender"
                        type="text"
                        id="gender"
                        name="userGender"
                        placeholder="Gender"
                        value={userGender}
                        handleChange={handleChange}
                    />
                    <InputField 
                        labelName="Breed"
                        type="text"
                        id="breed"
                        name="userBreed"
                        placeholder="Breed"
                        value={userBreed}
                        handleChange={handleChange}
                    />
                    <InputField 
                        labelName="Hobbies"
                        type="text"
                        id="hobbies"
                        name="userHobbies"
                        placeholder="Hobbies"
                        value={userHobbies}
                        handleChange={handleChange}
                    />
                    <InputField 
                        labelName="Nickname(s)"
                        type="text"
                        id="nicknames"
                        name="userNicknames"
                        placeholder="Nickname(s)"
                        value={userNicknames}
                        handleChange={handleChange}
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" >Save changes</button>
                    <button type="button" onClick={handleDiscard} >Discard changes</button>
                </div>
            </form>
            <div className="recent-posts">
                {
                //TODO: add wall post component
                }
            </div>
        </div>
    )
};


export default PrivateProfilePage;