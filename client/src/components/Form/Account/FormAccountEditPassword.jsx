import React from 'react';
import { Form, Button } from 'react-bootstrap';
import http from '../../../utils/http';

class FormAccountEditPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
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

        if (!this.state.oldPassword) {
            alert('Please enter your old password')
            error = true
        } else if (!this.state.newPassword) {
            alert('Please enter your new password')
            error = true
        } else if (!this.state.confirmPassword) {
            alert('Please confirm your new password')
            error = true
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            alert('Your new password and confirm password do not match')
            error = true
        }

        if (!error) {
            let data = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                confirmPassword: this.state.confirmPassword
            }

            this.put(data)
        }
    }

    put = (data) => {
        http.put('/users/password', data)
        .then((res) => {
            alert('Your password has been updated')
            window.location = '/account'
        })
        .catch((error) => {
            console.error(error)
            alert(error.response.data.message)
        });
    }

    render() {

        let buttonStyle = { maxWidth: '150px' }
        let buttonText = 'Update Password'
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control type="password" id="oldPassword" name="oldPassword" placeholder="" onChange={this.handleChange} value={this.state.oldPassword} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" id="newPassword" name="newPassword" placeholder="" onChange={this.handleChange} value={this.state.newPassword} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" id="confirmPassword" name="confirmPassword" placeholder="" onChange={this.handleChange} value={this.state.confirmPassword} required/>
                    </Form.Group>

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