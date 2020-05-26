import React from 'react';
import { Link } from 'react-router-dom';

import menuIcon from '../../assets/menu-icon.png';
import ProfilePic from '../profile-pic/profile-pic.component';

import './header.styles.scss';

const Header = () => {
    
    return (
        <div className="header">
            <img src={menuIcon} alt="icon for drop down menu" className="menu-icon" />
            {// TODO: Implement Menu drop down 
            }
            <h1 className="header-title">TITLE</h1>
            <Link className="profile-page" to="/profile" >
                <ProfilePic />
            </ Link>
            
            {/* <img src={profilePicture ? profilePicture : "X"} alt={title === "profile" ? "close profile page" : "open personal profile"} className="var-header-icon"/> */}
        </div>

    )
};

export default Header;