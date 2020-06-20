import React from 'react';
import { builder } from '../../sanity/sanity.utils.js';

import defaultProfilePic from '../../assets/defaultProfilePic.png';

import './profile-pic.styling.scss';

const ProfilePic = ({profilePicture, height, width}) => {
    
    return (
        <img src={ profilePicture ? builder.image(profilePicture).width(width).height(height).url() : defaultProfilePic } alt="Profile" className="var-header-icon" />
    )
};

export default ProfilePic;