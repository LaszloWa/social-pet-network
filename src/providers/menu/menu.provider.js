import React, { useState, createContext } from 'react';

export const MenuContext = createContext({
    hidden: true,
    toggleHidden: () => {},
});

const MenuProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    
    const toggleHidden = () => setHidden(!hidden;)

}

export default MenuContext;