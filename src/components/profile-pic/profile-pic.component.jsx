import React from 'react';

import defaultProfilePic from '../../assets/defaultProfilePic.png';

const ProfilePic = ({profilePicture, height, width}) => {
    
    
    return (
        <img src={ profilePicture ? profilePicture : defaultProfilePic } alt="Profile" className="var-header-icon" height={`${height}px`} width={`${width}px`} />
    )
};

export default ProfilePic;