import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import './drop-down-menu.styles.scss';

const DropdownMenu = ({ handleMenuToggle, handleSignOut }) => {

    return (
        <div className="menu-dropdown" >
            <nav className="menu-nav">
                <Link className="" to="/signin" onClick={handleMenuToggle} >Sign in</Link>                
                <Link className="" to="/signup" onClick={handleMenuToggle} >Sign up</Link>
                <Link className="" to="/profile" onClick={handleMenuToggle} >My profile</Link>
                <Link 
                    className="sign-out" to="/" 
                    onClick={() => auth.signOut()
                        .then(
                            handleSignOut)
                        .catch( err => console.log("an error occurred signing out" + err), handleMenuToggle) } 
                >
                    Sign Out
                </Link>

            </nav>
        </div>
    )
};

export default DropdownMenu;