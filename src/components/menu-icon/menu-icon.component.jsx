import React from 'react';


import menuIcon from '../../assets/menu-icon.png';

const MenuIcon = ({ handleMenuToggle }) => (
        <img src={menuIcon} alt="icon for drop down menu" className="menu-icon" onClick={handleMenuToggle} />
);

export default MenuIcon;