import React from 'react';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';

import http from '../../../utils/http';
import dateUtility from '../../../utils/date'

import Back from '../../../components/Navigation/Back'
import Loading from '../../../components/Loading/Loading'

class DataWeight extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            weight: null,
        }
    }

    componentDidMount() {
        http.get('/weight')
        .then((res) => {
            this.setState({ weight: res.data.weight })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    recordInputGroups = (list) => {
        return list.map(function (list, index) {
            const value = list.value;
            const date = dateUtility.applyTimezoneOffset(new Date(list.date));
            return (
                <EditInputGroup index={index} value={value} date={dateUtility.toString(date)} key={index}/>
            )
        })
    }

    render = () => {

        if (!this.state.weight) {
            return (<><Loading /></>)
        }

        let containerStyleData = {maxWidth: '40%', minWidth: '500px'}
        return (
            <>
                <Back/>
                <Container>
                    <div className="text-center">
                        <h2>Weight Data</h2>
                    </div>
                </Container>

                {this.state.weight && this.state.weight.length > 0 ?
                    <Container className="pb-5" style={containerStyleData}>
                        <b><label htmlFor="value" className="pt-2">Weight Data:</label></b>
                        {this.state.weight ? this.recordInputGroups(this.state.weight) : []}
                    </Container>
                : null}
           </>
        )
    }

}

class EditInputGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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

    handleEdit = (event) => {
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
                date: new Date(this.state.date),
                value: this.state.value,
                // timezoneOffset: dateUtility.getTimezoneOffset()
            }

            http.put('/weight/' + this.state.index, data)
            .then((res) => {
                alert('Edit Successful')
            })
            .catch((error) => {
                console.error(error)
                alert(error.response.data.message)
            });
        }
    }

    handleDelete = (event) => {
        if (window.confirm('Are you sure you want to delete this Weight record?')) {
            http.delete('/weight/' + this.state.index)
            .then((res) => {
                alert('Delete Successful')
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
                alert(error.response.data.message)
            });
        }
    }

    render = () => {
        return (
            <InputGroup className='p-1'>
                <FormControl type="number" id="index" name="index" value={this.state.index} onChange={this.handleChange} required hidden />
                <FormControl type="datetime-local" id="date" name="date" value={this.state.date} style={{ minWidth: '250px' }} onChange={this.handleChange} required />
                <FormControl type="number" id="value" name="value" value={this.state.value} min="0" step="0.1" style={{ minWidth: '70px', maxWidth: '75px' }} onChange={this.handleChange} required />
                <Button className="ml-2" variant="outline-primary" onClick={this.handleEdit}>Edit</Button>
                <Button className="ml-2" variant="outline-danger" onClick={this.handleDelete}>Delete</Button>
            </InputGroup>
        )
    }

}

export default DataWeight;