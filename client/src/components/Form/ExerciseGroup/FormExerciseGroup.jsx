import React from 'react';
import { Form, Button } from 'react-bootstrap';
import http from '../../../utils/http';

class FormExerciseGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exerciseGroup: props.exerciseGroup,
            action: props.action,
            name: '',
            note: '',
        }
    }

    // TODO Method Deprecated
    componentWillReceiveProps(nextProps) {
        this.setState({
            exerciseGroup: nextProps.exerciseGroup,
            action: 'EDIT',
            name: nextProps.exerciseGroup.name
        })
        if (nextProps.exerciseGroup.note) {
            this.setState({
                note: nextProps.exerciseGroup.note
            })
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

        if (!this.state.name) {
            alert('Please enter a Group Name')
            error = true
        }

        if (!error) {
            let data = {
                name: this.state.name,
            }
            if (this.state.note) {
                data['note'] = this.state.note
            }

            if (this.state.action === 'ADD') {
                this.post(data)
            } else if (this.state.action === 'EDIT') {
                this.put(data, this.state.exerciseGroup.id)
            }
        }
    }

    post = (data) => {
        http.post('/groups', data)
        .then((res) => {
            window.location = '/group/' + res.data.exerciseGroup.id
        })
        .catch((error) => {
            console.error(error)
        });
    }

    put = (data, id) => {
        http.put('/groups/' + id, data)
            .then((res) => {
            window.location = '/group/' + id
        })
        .catch((error) => {
            console.error(error)
        });
    }

    render() {

        if (!this.state.exerciseGroup && this.state.action === 'EDIT') {
            return (<></>)
        }

        let buttonStyle = { maxWidth: '150px' }
        let buttonText = ''
        if (this.state.action === 'ADD') {
            buttonText = 'Add'
        } else if (this.state.action === 'EDIT') {
            buttonText = 'Edit'
        }
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control type="text" id="name" name="name" placeholder="My Exercise Group" onChange={this.handleChange} value={this.state.name} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Note <span className="text-muted">(Optional)</span></Form.Label>
                        <Form.Control as="textarea" id="note" name="note" placeholder="I need to work on ..." rows="3" onChange={this.handleChange} value={this.state.note}/>
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

export default FormExerciseGroup;