import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

import './Loading.scss';

class Loading extends React.Component {

    render() {
        return (
            <>
                <Container className="loading text-center">
                    <Spinner animation="border" variant="primary" />
                </Container>
            </>
        );
    }
}

export default Loading;