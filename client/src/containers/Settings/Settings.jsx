import React from 'react';
import { Container } from 'react-bootstrap';
import http from '../../utils/http';

import FormSettings from '../../components/Form/Settings/FormSettings';

import settings from '../../utils/settings';

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settings: null,
        }
    }

    componentDidMount() {
        http.get('/settings')
        .then((res) => {
            settings.setSettings(res.data.settings)
            this.setState({ settings: res.data.settings })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render = () => {

        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Container style={containerStyle}>
                    <div className="pt-5 text-center">
                        <h2>Settings</h2>
                    </div>
                    <div className="pt-3 text-center">
                        <FormSettings settings={this.state.settings} />
                    </div>
                </Container>
            </>
        );
    }

}

export default Settings;