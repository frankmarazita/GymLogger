import React from 'react';
import { Form, Button } from 'react-bootstrap';
import http from '../../../utils/http';

class FormAccountEditPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            password: '',
            twoFactorToken: '',
        }
    }

    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let stateData = { [name]: value }
        this.setState(stateData)
    }

    handleSubmit = (event) => {
        let error = false

        if (!this.state.password) {
            alert('Please enter your password')
            error = true
        }

        if (this.state.user.twoFactorEnabled) {
            if (!this.state.twoFactorToken) {
                alert('Please enter your two factor token')
                error = true
            } else if (this.state.twoFactorToken.length !== 6) {
                alert('Please enter a valid two factor token')
                error = true
            }
        }

        if (!error) {
            if (!this.state.user.twoFactorEnabled) {
                this.enableTwoFactor()
            } else {
                this.disableTwoFactor()
            }
        }
    }

    enableTwoFactor = () => {
        let data = {
            password: this.state.password
        }

        http.post('/users/twoFactor', data)
        .then((res) => {
            this.props.onTwoFactorEnabled(res)
        })
        .catch((error) => {
            console.error(error)
            alert(error.response.data.message)
        });
    }

    disableTwoFactor = () => {
        let data = {
            password: this.state.password,
            twoFactorToken: this.state.twoFactorToken
        }

        http.delete('/users/twoFactor', {data: data})
        .then((res) => {
            alert('2FA has been disabled')
            window.location = '/account'
        })
        .catch((error) => {
            console.error(error)
            alert(error.response.data.message)
        });
    }

    render() {

        let buttonStyle = { maxWidth: '150px' }
        let buttonText = !this.state.user.twoFactorEnabled ? 'Enable 2FA' : 'Disable 2FA'
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" name="password" placeholder="" onChange={this.handleChange} value={this.state.password} required />
                    </Form.Group>

                    {this.state.user.twoFactorEnabled ?
                    <Form.Group className="mb-3">
                        <Form.Label>Two Factor Token</Form.Label>
                        <Form.Control type="twoFactorToken" id="twoFactorToken" name="twoFactorToken" placeholder="" onChange={this.handleChange} value={this.state.twoFactorToken} required />
                    </Form.Group>
                    : null}

                    <hr></hr>
                    <div className="d-flex justify-content-center">
                        <Button className="btn-block" variant="primary" style={buttonStyle} onClick={this.handleSubmit}>{buttonText}</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default FormAccountEditPassword;