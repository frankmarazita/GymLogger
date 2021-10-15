import React from 'react';
import { Container, Button } from 'react-bootstrap';

import './Error.scss';

class Error extends React.Component {

    constructor(props) {
        super(props);

        // TODO Make error page able to handle any error code
        this.state = {
            code: '404',
            message: 'Page Not Found',
        }
    }

    render = () => {
        return (
            <>
                <Container className="error-page">
                    <div className="text-center">
                        <h1>{this.state.code}</h1>
                        <h4>{this.state.message}</h4>
                        <p className="lead text-muted">An error occurred. Press the following button to return to the home page.</p>
                        <Button href="/" variant="secondary">Go Home</Button>
                    </div>
                </Container>
            </>
        );
    }

}

export default Error;