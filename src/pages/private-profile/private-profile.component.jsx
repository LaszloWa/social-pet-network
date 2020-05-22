import React, { useState } from 'react';

import ProfilePic from '../../components/profile-pic/profile-pic.component';
import InputField from '../../components/input-field/input-field.component';

import './private-profile.styles.scss';

const PrivateProfilePage = () => {
    const [userProfile, setUserProfile] = useState({profileName: ""});

    const { profileName, profileBio } = userProfile;

    const handleChange = (event) => {
        const {name, value } = event.target

        setUserProfile({ ...userProfile, [name]: value })

        console.log(userProfile)
    }

   return (
        <div>
            <div className="profile-pic">
                <ProfilePic height={200} width={200} />
            </div>
            <div className="profile-header">
                <InputField
                    labelName="Name"
                    type="text"
                    name="profileName"
                    placeholder="Name"
                    value={profileName} 
                    handleChange={handleChange} 
                />
                <div>
                    <label htmlFor="profileBio" >Bio: </label>
                    <textarea       
                        className="profile-description"
                        placeholder="Pet bio"
                        name="profileBio"
                        id="profileBio"
                        onChange={handleChange}
                    >
                            { profileBio ? profileBio : null}
                    </textarea>
                </div>
            </div>
            <div className="about-me-section">
                <h3>About me</h3>
                <form className="about-me-form">
                    <div>
                        <label htmlFor="age">Age: </label> 
                        <input type="text" id="age" placeholder="Age" value="" />
                    </div>
                    <div>
                        <label htmlFor="gender">Gender: </label>
                        <input type="text" id="gender" placeholder="Gender" />
                    </div>
                    <div>
                        <label htmlFor="breed">Breed: </label>
                        <input type="text" id="breed" placeholder="Breed" />
                    </div>
                    <div>
                        <label htmlFor="hobbies">Hobbies: </label>
                        <input type="text" id="hobbies" placeholder="Hobbies" />
                    </div>
                    <div>
                        <label htmlFor="nickname">Nickname(s): </label>
                        <input type="text" id="nickname" placeholder="Nickname" />
                    </div>
                </form>
                <button type="submit" >Save changes</button>
            </div>
            <div className="recent-posts">
                {
                //TODO: add wall post component
                }
            </div>
        </div>
    )
};


export default PrivateProfilePage;