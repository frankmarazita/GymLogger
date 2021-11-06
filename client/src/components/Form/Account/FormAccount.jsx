import React from 'react';
import { Form, Button } from 'react-bootstrap';
import http from '../../../utils/http';

import Loading from '../../Loading/Loading'

class FormAccount extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            name: '',
            email: ''
        }
    }

    // TODO Method Deprecated
    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
            name: nextProps.user.name,
            email: nextProps.user.email
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

        if (!this.state.name) {
            alert('Please enter a Name')
            error = true
        } else if (!this.state.email) {
            alert('Please enter an Email')
            error = true
        }

        if (!error) {
            let data = {
                name: this.state.name,
                email: this.state.email
            }

            this.put(data, this.state.user.id)
        }
    }

    put = (data, id) => {
        http.put('/users', data)
        .then((res) => {
            window.location = '/account'
        })
        .catch((error) => {
            console.error(error)
            alert(error.response.data.message)
        });
    }

    render() {

        if (!this.state.user) {
            return (<><Loading /></>)
        }

        let buttonStyle = { maxWidth: '150px' }
        let buttonText = 'Edit'
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="name" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" id="email" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
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

export default FormAccount;