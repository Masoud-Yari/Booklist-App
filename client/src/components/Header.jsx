import React from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const Header = () => {
    return (
        <div className="header">
            <MenuBookIcon style={{ fontSize : 60, color : '#F173AF' }} />
            <h1>M.Y Booklist App</h1>
        </div>
    )
}

export default Header;