import React from 'react';
import { Container } from 'react-bootstrap';

import './Footer.scss';

class Footer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: new Date().getFullYear()
        }
    }

    render() {
        return (
            <footer className="footer">
                <Container>
                    <span className="text-muted">&copy; {this.state.year} Gym Logger. All rights reserved.</span>
                </Container>
            </footer>
        );
    }
}

export default Footer;