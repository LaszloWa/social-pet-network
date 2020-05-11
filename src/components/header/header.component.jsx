import React from 'react';

import './header.styles.scss';

const Header = ({title, profilePicture}) => (
    <div className="header">
        <img src="" alt="icon for drop down menu" className="menu-icon"/>
        <h1 className="header-title">{title}</h1>
        <img src={profilePicture ? profilePicture : "X"} alt={title === "profile" ? "close profile page" : "open personal profile"} className="var-header-icon"/>
    </div>
);

export default Header;