import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import http from '../../../utils/http';

import Loading from '../../Loading/Loading'

import settings from '../../../utils/settings';

class FormSettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settings: props.settings,
            darkMode: false,
            buttonNavigation: false,
        }
    }

    // TODO Method Deprecated
    componentWillReceiveProps(nextProps) {

        this.setState({
            settings: nextProps.settings ? nextProps.settings : {},
            darkMode: nextProps.settings && nextProps.settings.darkMode ? nextProps.settings.darkMode : false,
            buttonNavigation: nextProps.settings && nextProps.settings.buttonNavigation ? nextProps.settings.buttonNavigation : false,
        })
    }

    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let stateData = { [name]: value }
        this.setState(stateData)
    }

    handleSubmit = (event) => {

        let error = false

        if (!error) {
            const data = {
                darkMode: this.state.darkMode,
                buttonNavigation: this.state.buttonNavigation
            }

            this.update(data)
        }
    }

    update = (data) => {
        console.log(data)
        http.put('/settings', data)
        .then((res) => {
            settings.setSettings(data)
            alert('Settings updated')
        })
        .catch((error) => {
            console.error(error)
            alert(error.response.data.message)
        });
    }

    handleSwitch = (event) => {
        let name = event.target.name;
        let stateData = { [name]: !this.state[name] }
        this.setState(stateData)
    }

    render() {

        if (!this.state.settings) {
            return (<><Loading /></>)
        }

        let buttonStyle = { maxWidth: '150px' }
        let buttonText = 'Save'
        let containerStyle = { maxWidth: '55%', minWidth: '275px' }

        return (
            <>
                <Form>
                    <Container className='text-left' style={containerStyle}>
                        <div className='custom-control custom-switch'>
                        <input type='checkbox' className='custom-control-input' name='darkMode' id='darkMode' onChange={this.handleSwitch} checked={this.state.darkMode} readOnly />
                        <label className='custom-control-label' htmlFor='darkMode'>Dark Mode</label>
                        </div>
                        <div className='custom-control custom-switch mt-2'>
                        <input type='checkbox' className='custom-control-input' name='buttonNavigation' id='buttonNavigation' onChange={this.handleSwitch} checked={this.state.buttonNavigation} readOnly />
                        <label className='custom-control-label' htmlFor='buttonNavigation'>Navigation Buttons Enabled</label>
                        </div>
                    </Container>
                    <Button className="mt-4 px-3" variant="primary" size="sm" style={buttonStyle} onClick={this.handleSubmit}>{buttonText}</Button>
                </Form>
            </>
        );
    }
}

export default FormSettings;