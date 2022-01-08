import React from 'react';
import { Container, Button, Navbar, Nav} from 'react-bootstrap';

import session from '../../utils/session';

class HeaderNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Gym Logger",
            items: [
                { value: "Account", path: "/account" },
                { value: "Data", path: "/data" }
            ]
        }
    }

    handleLogout = (event) => {
        // TODO Correct the logout behavior
        session.deleteToken()
        window.location = '/login'
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/">{this.state.title}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavbarItems items={this.state.items} />
                        </Nav>
                        <Button className="ml-auto" variant="outline-light" onClick={this.handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

}

class NavbarItems extends React.Component {

    render = () => {
        let items = this.props.items

        return items.map(function (item, index) {
            const value = item.value;
            const path = item.path;
            return (
                <Nav.Link href={path} key={index}>{value}</Nav.Link>
            )
        })
    };
}

export default HeaderNavbar;