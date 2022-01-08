import React from 'react';

import HeaderNavbar from './HeaderNavbar'

class Header extends React.Component {

    render() {
        return (
            <header className="mb-5">
                <HeaderNavbar />
            </header>
        );
    }
}

export default Header;