import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import ProfilePic from '../profile-pic/profile-pic.component';

import CurrentUserContext from '../../contexts/current-user/current-user.context';

import './header.styles.scss';
import DropdownMenu from '../drop-down-menu/drop-down-menu.component';
import MenuIcon from '../menu-icon/menu-icon.component';
import { auth } from '../../firebase/firebase.utils';

const Header = () => {
    const currentUser = useContext(CurrentUserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const onMenuToggle = () => setIsMenuOpen(!isMenuOpen);

    const onSignOut = () => {
        auth.signOut();
        onMenuToggle();
    }
    
    return (
        <div className="header">
            <MenuIcon handleMenuToggle={onMenuToggle} />
            {
                isMenuOpen ?
                    null :
                    <DropdownMenu handleMenuToggle={onMenuToggle} handleSignOut={onSignOut} />
            }
            <h1 className="header-title">TITLE</h1>
            {
                currentUser ?
                    <Link className="profile-page" to="/profile" >
                        <ProfilePic profilePicture={currentUser.userPic} />
                    </ Link>
                    :
                    <Link className="sign-in-page" to="/signin" >
                        <p className="sign-in-link">Sign in</p>
                    </ Link>
            }
            
            {/* <img src={profilePicture ? profilePicture : "X"} alt={title === "profile" ? "close profile page" : "open personal profile"} className="var-header-icon"/> */}
        </div>

    )
};

export default Header;