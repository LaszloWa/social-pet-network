import React, { useState } from 'react';

import ProfilePic from '../../components/profile-pic/profile-pic.component';
import InputField from '../../components/input-field/input-field.component';

import { writeClient } from '../../sanity/sanity.utils';
import { auth } from '../../firebase/firebase.utils';

import './private-profile.styles.scss';

const PrivateProfilePage = ({ currentUserProfile, handleUserUpdate }) => {
    const [userProfile, setUserProfile] = useState(currentUserProfile);

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
                    .then(res => {
                        if (userPic && userPic.asset) {
                            writeClient
                                .delete(`${userPic.asset._ref}`)
                        }
                    }
                    )
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
        setUserProfile(currentUserProfile);
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

    const handleDeleteProfile = (event) => {
        const deleteProfilePrompt = prompt('If you really want to delete this account, please enter YES below');

        if (deleteProfilePrompt === 'YES') {
            writeClient
                .patch(`${_id}`)
                .unset(['userPic'])
                .commit()
                .then(res => {
                    if (userPic && userPic.asset) {
                        writeClient
                            .delete(`${userPic.asset._ref}`)
                    }
                    writeClient.delete(`${_id}`);
                    console.log('deleted asset and user from sanity')
                })
                .then(res => {
                    console.log('deleting user from firebase')
                    auth.currentUser.delete()
                    .then(res => console.log('firebase user deleted'))
                    .catch(err => console.log(`Error handling firebase user deletion: ${err}`))
                })
                .then(res => handleUserUpdate(null))
                .then(res => alert(`User Profile for ${userName} successfully deleted`))
                .catch(err => console.log(`Sorry, something went wrong: ${err}`))
        } else {
            alert(`Sorry, but to delete your profile you must enter 'YES', not '${deleteProfilePrompt}'`);
        }
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
            <div className="danger-zone">
                <h2 className="danger-zone-header">DANGER ZONE</h2>
                <button type="button" className="delete-profile-btn" onClick={handleDeleteProfile}>Delete account</button>
            </div>
        </div>
    )
};


export default PrivateProfilePage;