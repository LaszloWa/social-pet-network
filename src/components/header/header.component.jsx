import React from 'react';

import menuIcon from '../../assets/menu-icon.png';
import ProfilePic from '../profile-pic/profile-pic.component';

import './header.styles.scss';

const Header = () => (
    <div className="header">
        <img src={menuIcon} alt="icon for drop down menu" className="menu-icon"/>
        <h1 className="header-title">TITLE</h1>
        <ProfilePic />
        
        {/* <img src={profilePicture ? profilePicture : "X"} alt={title === "profile" ? "close profile page" : "open personal profile"} className="var-header-icon"/> */}
    </div>
);

export default Header;