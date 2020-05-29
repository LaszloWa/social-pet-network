import React from 'react';
import { Link } from 'react-router-dom';

import './drop-down-menu.styles.scss';

const DropdownMenu = ({ handleMenuToggle }) => {

    return (
        <div className="menu-dropdown" >
            <nav className="menu-nav">
                <Link className="" to="/signin" onClick={handleMenuToggle} >Sign in</Link>                
                <Link className="" to="/signup" onClick={handleMenuToggle} >Sign up</Link>
                <Link className="" to="/profile" onClick={handleMenuToggle} >My profile</Link>
            </nav>
        </div>
    )
};

export default DropdownMenu;