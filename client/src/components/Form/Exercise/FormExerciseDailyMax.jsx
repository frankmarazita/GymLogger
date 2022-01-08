import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import http from '../../../utils/http';

class DailyMax extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dailyMax: null
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

        if (!this.state.dailyMax) {
            alert('Please enter a Daily Max')
            error = true
        } else if (this.state.dailyMax < 0) {
            alert('Invalid Daily Max')
            error = true
        }

        if (!error) {
            let data = {
                dailyMax: this.state.dailyMax
            }

            http.post('/exercises/' + this.props.exercise.id + '/dailyMax', data)
                .then((response) => {
                    alert('Daily Max Added Successfully')
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

        let typeString = ''

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
                <label htmlFor="dailyMax">Enter Daily Max {typeString}</label>
                <InputGroup>
                    <FormControl type="number" id="dailyMax" name="dailyMax" placeholder={'Max ' + typeString} aria-label={'Max ' + typeString} min="0" onChange={this.handleChange} required />
                    <Button className="btn-block ml-3" variant="primary" style={buttonStyle} onClick={this.handleSubmit}>Add</Button>
                </InputGroup>
            </div>
        );
    }
}

export default DailyMax;