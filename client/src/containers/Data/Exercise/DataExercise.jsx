import React from 'react';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import http from '../../../utils/http';
import dateUtility from '../../../utils/date'

import Back from '../../../components/Navigation/Back'
import Loading from '../../../components/Loading/Loading'

class DataExercise extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exerciseID: props.computedMatch.params.id,
            exercise: null,
        }
    }

    componentDidMount() {
        http.get('/exercises/' + this.state.exerciseID)
        .then((res) => {
            this.setState({ exercise: res.data.exercise })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    recordInputGroups = (list, type) => {
        let exerciseID = this.state.exerciseID
        return list.map(function (list, index) {
            const value = list.value;
            const date = dateUtility.applyTimezoneOffset(new Date(list.date));
            return (
                <EditInputGroup exerciseID={exerciseID} type={type} index={index} value={value} date={dateUtility.toString(date)} key={index}/>
            )
        })
    }

    render = () => {

        if (!this.state.exercise) {
            return (<><Loading /></>)
        }

        let containerStyleData = {maxWidth: '40%', minWidth: '450px'}
        return (
            <>
                <Back/>
                <Container>
                    <div className="text-center">
                        <h2>{this.state.exercise ? this.state.exercise.name : ''} Data</h2>
                    </div>
                </Container>

                <Container style={containerStyleData}>
                    <b><label htmlFor="value" className="pt-2">Daily Max Data:</label></b>
                    {this.state.exercise ? this.recordInputGroups(this.state.exercise.dailyMax, 'dailyMax') : []}
                </Container>

                <Container style={containerStyleData}>
                    <b><label htmlFor="value" className="pt-2">Goals:</label></b>
                    {this.state.exercise ? this.recordInputGroups(this.state.exercise.goal, 'goal') : []}
                </Container>
           </>
        )
    }

}

class EditInputGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exerciseID: props.exerciseID,
            type: props.type,
            index: props.index,
            date: props.date,
            value: props.value
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

        if (!this.state.value) {
            alert('Please enter a Value')
            error = true
        } else if (!this.state.date) {
            alert('Please enter a Date')
            error = true
        } else if (this.state.value < 0) {
            alert('Invalid Value')
            error = true
        }

        if (!error) {
            let data = {
                index: this.state.index,
                date: new Date(this.state.date),
                value: this.state.value,
                timezoneOffset: dateUtility.getTimezoneOffset()
            }

            http.put('/exercises/' + this.state.exerciseID + '/' + this.state.type + '/' + this.state.index, data)
                .then((response) => {
                    alert('Edit Successful')
                    // window.location.reload()
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }

    render = () => {
        return (
            <InputGroup className='p-1'>
                <FormControl type="number" id="index" name="index" value={this.state.index} onChange={this.handleChange} required hidden />
                <FormControl type="datetime-local" id="date" name="date" value={this.state.date} style={{ minWidth: '250px' }} onChange={this.handleChange} required />
                <FormControl type="number" id="value" name="value" value={this.state.value} min="0" style={{ maxWidth: '100px' }} onChange={this.handleChange} required />
                <Button className="btn-block ml-3" variant="outline-primary" style={{maxWidth: '70px'}} onClick={this.handleSubmit}>Edit</Button>
            </InputGroup>
        )
    }

}

export default DataExercise;