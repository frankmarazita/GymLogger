import React from 'react';
import { Container, Button } from 'react-bootstrap';

import CT from '../../constants/codeTables';

import './Error.scss';

class Error extends React.Component {

    constructor(props) {
        super(props);

        let defaultCode = 404;

        this.state = {
            code: props.computedMatch.params.code ? props.computedMatch.params.code : defaultCode,
            message: props.computedMatch.params.code ? CT.Status.C[props.computedMatch.params.code] : CT.Status.C[defaultCode],
        }
    }

    render = () => {
        return (
            <>
                <Container className="error-page">
                    <div className="text-center">
                        <h1>{this.state.code}</h1>
                        <h4>{this.state.message}</h4>
                        <p className="lead text-muted">Press the following button to return to the home page.</p>
                        <Button href="/" variant="secondary">Go Home</Button>
                    </div>
                </Container>
            </>
        );
    }

}

export default Error;