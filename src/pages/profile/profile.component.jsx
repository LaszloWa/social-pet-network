import React from 'react';

import Header from '../../components/header/header.component';

import defaultProfilePic from '../../assets/defaultProfilePic.png';

import './profile.styles.scss';

const ProfilePage = () => (
    <div>
        <Header title="profile" profilePicture={defaultProfilePic} />
        Hello World!
    </div>
);

export default ProfilePage;