import React from 'react';
import { Container } from 'react-bootstrap';

class Back extends React.Component {

    render() {
        let path = this.props.path
        if (!path) {
            path = document.referrer
        }
        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Container style={containerStyle}>
                    <div className="pt-3" style={{ fontSize: '48px' }}>
                        <a href={path} style={{ color: 'inherit' }}>
                            <i class="las la-arrow-circle-left"></i>
                        </a>
                    </div>
                </Container>
            </>
        );
    }
}

export default Back;