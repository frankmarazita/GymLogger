import { Redirect } from 'react-router-dom';
import React from 'react';
import session from '../utils/session';

class AuthenticatedRoute extends React.Component {

    constructor(props) {
        super(props);
        const { component: Component} = this.props;

        this.state = {
            isLoggedIn: false,
            route: <Component {...props} />
        }
    }

    render = () => {
        let isLoggedIn = session.isLoggedIn();

        if (!isLoggedIn) {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            this.state.route
        );
    }
}

export default AuthenticatedRoute;