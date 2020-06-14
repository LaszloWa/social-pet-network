import React, { useState } from 'react';

import ProfilePic from '../../components/profile-pic/profile-pic.component';
import InputField from '../../components/input-field/input-field.component';

import { writeClient } from '../../sanity/sanity.utils';

import './private-profile.styles.scss';

const PrivateProfilePage = ({ currentUser, handleUserUpdate }) => {
    const [userProfile, setUserProfile] = useState(currentUser);

    const [imageUploadLink, setImageUploadLink] = useState('');

    const { userName, userAge, userGender, userBreed, userHobbies, userNicknames, userBio, _id, userPic } = userProfile;

    const handleChange = (event) => {
        const {name, value } = event.target



        setUserProfile({...userProfile, [name]: value})
    };

    const onPhotoChange = (event) => {
        setImageUploadLink(event.target.files[0])
    };

    const handlePhotoUpload = (event) => {
        event.preventDefault();

        writeClient.assets
            .upload('image', imageUploadLink, {filename: imageUploadLink.name
            })
            .then(imageAsset => {
                writeClient
                    .patch(`${_id}`)
                    .unset(['userPic'])
                    .commit()
                    .then(
                        writeClient
                            .patch(`${_id}`)
                            .set({
                                userPic: {
                                    "_type": "image",
                                    "asset": {
                                    "_type": "reference",
                                    "_ref": `${imageAsset._id}`
                                    },
                                }
                            })
                            .commit()
                            .then(res => {
                                if (userPic && userPic.asset) {
                                    writeClient
                                        .delete(`${userPic.asset._ref}`)
                                }
                            }
                            )
                            .then(setUserProfile({...userProfile, userPic: {
                                "_type": "image",
                                "asset": {
                                "_type": "reference",
                                "_ref": `${imageAsset._id}`
                                },
                                "caption": "This is the caption",
                            }}))
                            .then(handleUserUpdate(userProfile))
                    )
                    .catch(err => console.log('You messed up' + err))
            })

        
        };

    const handleDiscard = (event) => {
        // TODO: reset state to state fetched from DB
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        writeClient
            .patch(`${_id}`)
            .set(userProfile)
            .commit()
            .then(res => handleUserUpdate(userProfile))
            .catch(err => console.log('You messed up' + err))
    };

   return (
        <div>
            <form className="profile-photo" onSubmit={handlePhotoUpload}>
                <div className="profile-pic">
                    <ProfilePic height={200} width={200} profilePicture={userPic} />
                    <InputField
                        labelName="ProfilePic"
                        type="file"
                        id="userPic"
                        name="userPic" 
                        accept=".jpg, .jpeg, .png"
                        multiple={false}
                        onChange={onPhotoChange}
                    />
                </div>
                <button type="submit" >Upload Image</button>
            </form>
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