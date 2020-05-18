import React from 'react';

import defaultProfilePic from '../../assets/defaultProfilePic.png';

const ProfilePic = ({profilePicture, height, width}) => (
    <img src={ defaultProfilePic } alt="Profile" className="var-header-icon" height={`${height}px`} width={`${width}px`} />
);

export default ProfilePic;