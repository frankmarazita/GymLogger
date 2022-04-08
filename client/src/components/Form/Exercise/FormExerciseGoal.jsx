import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import http from '../../../utils/http';

class Goal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            goal: null
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

        if (!this.state.goal) {
            alert('Please enter a Goal')
            error = true
        } else if (this.state.goal < 0) {
            alert('Invalid Goal')
            error = true
        }

        if (!error) {
            let data = {
                value: this.state.goal
            }

            http.post('/exercises/' + this.props.exercise.id + '/goal', data)
                .then((response) => {
                    alert('Goal Set Successfully')
                    window.location.reload()
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }

    render() {

        let exercise = this.props.exercise

        if (!exercise) {
            return ('')
        }

        let currentGoal = null
        let typeString = ''

        if (exercise.currentGoal) {
            currentGoal = exercise.currentGoal
        }

        if (exercise.exerciseType === '1' || exercise.exerciseType === '2') {
            typeString = 'kg'
        } else if (exercise.exerciseType === '3') {
            typeString = 'Level'
        } else if (exercise.exerciseType === '4') {
            typeString = 'Reps'
        } else if (exercise.exerciseType === '5') {
            typeString = 'km'
        }

        let buttonStyle = { maxWidth: '70px' }

        return (
            <div>
                <label htmlFor="goal">Set Goal {typeString}</label>
                <InputGroup>
                    <FormControl type="number" id="goal" name="goal" placeholder={'Goal ' + typeString} aria-label={'Goal ' + typeString} min="0" onChange={this.handleChange} required />
                    <Button className="btn-block ml-3" variant="primary" style={buttonStyle} onClick={this.handleSubmit}>Set</Button>
                </InputGroup>
                <div className="pt-2">
                    {currentGoal ? 'Current Goal: ' + currentGoal + typeString : ''}
                </div>
            </div>
        );
    }
}

export default Goal;