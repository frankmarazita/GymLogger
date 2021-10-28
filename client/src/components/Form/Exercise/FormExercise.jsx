import React from 'react';
import { Form, Button } from 'react-bootstrap';
import http from '../../../utils/http';

import CT from '../../../constants/codeTables'

import Loading from '../../Loading/Loading'

class FormExercise extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exercise: props.exercise,
            action: props.action,
            name: '',
            note: '',
            exerciseGroups: [],
            exerciseGroupID: '',
            exerciseTypeID: '',
        }
    }

    componentDidMount() {
        http.get('/groups')
        .then((res) => {
            this.setState({ exerciseGroups: res.data.exerciseGroups })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // TODO Method Deprecated
    componentWillReceiveProps(nextProps) {
        this.setState({
            exercise: nextProps.exercise,
            action: CT.Form.C.Action.C.Edit,
            name: nextProps.exercise.name
        })
        if (nextProps.exercise.note) {
            this.setState({
                note: nextProps.exercise.note
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

        if (this.state.name === '') {
            alert('Please enter an Exercise Name')
            error = true
        } else if (this.state.action === CT.Form.C.Action.C.Add) {
            if (this.state.exerciseGroupID === '') {
                alert('Please select an Exercise Group')
                error = true
            } else if (this.state.exerciseTypeID === '') {
                alert('Please select an Exercise Type')
                error = true
            }
        }

        if (!error) {
            let data = {
                name: this.state.name
            }
            if (this.state.note !== '') {
                data['note'] = this.state.note
            }
            if (this.state.action === CT.Form.C.Action.C.Add) {
                data['exerciseGroupID'] = this.state.exerciseGroupID
                data['exerciseTypeID'] = this.state.exerciseTypeID
            }

            if (this.state.action === CT.Form.C.Action.C.Add) {
                this.post(data)
            } else if (this.state.action === CT.Form.C.Action.C.Edit) {
                this.put(data, this.state.exercise.id)
            }
        }
    }

    deleteExercise = (event) => {
        let result = window.confirm('Are you sure you want to delete this exercise?');
        if (result === true) {
            this.delete(this.state.exercise.id)
        }
    }

    post = (data) => {
        http.post('/exercises', data)
        .then((res) => {
            window.location = '/exercise/' + res.data.exercise.id
        })
        .catch((error) => {
            console.error(error)
        });
    }

    put = (data, id) => {
        http.put('/exercises/' + id, data)
        .then((res) => {
            window.location = '/exercise/' + id
        })
        .catch((error) => {
            console.error(error)
        });
    }

    delete = (id) => {
        http.delete('/exercises/' + id)
        .then((res) => {
            window.location = '/group/' + this.state.exercise.exerciseGroup
        })
        .catch((error) => {
            console.error(error)
        });
    }

    render() {

        if (!this.state.exercise && this.state.action === CT.Form.C.Action.C.Edit) {
            return (<><Loading /></>)
        }

        let buttonStyle = { maxWidth: '150px' }
        let buttonText = ''
        if (this.state.action === CT.Form.C.Action.C.Add) {
            buttonText = 'Add'
        } else if (this.state.action === CT.Form.C.Action.C.Edit) {
            buttonText = 'Edit'
        }
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Exercise Name</Form.Label>
                        <Form.Control type="text" id="name" name="name" placeholder="My Exercise" onChange={this.handleChange} value={this.state.name} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Note <span className="text-muted">(Optional)</span></Form.Label>
                        <Form.Control as="textarea" id="note" name="note" placeholder="I need to work on ..." rows="3" onChange={this.handleChange} value={this.state.note} />
                    </Form.Group>

                    {this.state.action === CT.Form.C.Action.C.Add &&
                        <Form.Group className="mb-3">
                            <Form.Label>Exercise Group</Form.Label>
                            <Form.Control as="select" id="exerciseGroupID" name="exerciseGroupID" onChange={this.handleChange} value={this.state.exerciseGroupID} required >
                                <option value='' disabled hidden>...</option>
                                {this.state.exerciseGroups.map((exerciseGroup, i) => <option value={exerciseGroup.id} key={i}>{exerciseGroup.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                    }

                    {this.state.action === CT.Form.C.Action.C.Add &&
                        <Form.Group className="mb-3">
                            <Form.Label>Exercise Type</Form.Label>
                            <Form.Control as="select" id="exerciseTypeID" name="exerciseTypeID" onChange={this.handleChange} value={this.state.exerciseTypeID} required >
                                <option value='' disabled hidden>...</option>
                                {Object.keys(CT.ExerciseType.C.Value.C).map((key, i) => <option value={key} key={i}>{CT.ExerciseType.C.Value.C[key] }</option>)}
                            </Form.Control>
                        </Form.Group>
                    }

                    <hr></hr>
                    <div className="d-flex justify-content-center">
                        <Button className="btn-block" variant="primary" style={buttonStyle} onClick={this.handleSubmit}>{buttonText}</Button>
                    </div>

                    {this.state.action === CT.Form.C.Action.C.Edit && <hr></hr>}
                    {this.state.action === CT.Form.C.Action.C.Edit &&
                        <div className="d-flex justify-content-center">
                            <Button className="btn-block" variant="outline-danger" style={buttonStyle} onClick={this.deleteExercise}>Delete</Button>
                        </div>
                    }
                </Form>
            </div>
        );
    }
}

export default FormExercise;