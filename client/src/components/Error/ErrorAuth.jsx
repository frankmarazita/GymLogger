import React from 'react';
import { Alert } from 'react-bootstrap';
import './ErrorAuth.scss';

class ErrorAuth extends React.Component {
    render() {
        let errorMessage = this.props.errorMessage
        let component = null

        if (errorMessage && errorMessage !== "") {
            component = <Alert variant="danger"><b>Error:</b> {errorMessage}</Alert>
        }
        return component
    }
}

export default ErrorAuth;