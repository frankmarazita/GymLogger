import React from 'react';
import { Container } from 'react-bootstrap';

import settings from '../../utils/settings';

class Back extends React.Component {

    render() {

        if (!settings.getSettings().buttonNavigation) {
            return (
                <>
                    <Container>
                        <div className="pt-5 text-center"></div>
                    </Container>
                </>
            );
        }

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
                            <i className="las la-arrow-circle-left"></i>
                        </a>
                    </div>
                </Container>
            </>
        );
    }
}

export default Back;