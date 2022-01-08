import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import http from '../../../utils/http';

class WeightForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            weight: null
        }
    }

    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let stateData = { [name]: value }
        this.setState(stateData)
    }

    handleAdd = (event) => {
        let error = false

        this.setState({ weight: parseFloat(this.state.weight) })

        if (!this.state.weight) {
            error = 'Please enter a Weight'
        } else if (this.state.weight < 0) {
            error = 'Invalid Weight'
        }

        if (!error) {
            let data = {
                value: this.state.weight
            }

            http.post('/weight', data)
            .then((res) => {
                alert('Daily Max Added Successfully')
                window.location.reload()
            })
            .catch((error) => {
                console.error(error)
                alert(error.response.data.message)
            });
        } else {
            alert(error)
        }
    }

    render() {

        let weight = this.props.weight

        if (!weight) {
            return ('')
        }

        let buttonStyle = { maxWidth: '70px' }

        return (
            <div>
                <label htmlFor="weight">Log Weight</label>
                <InputGroup>
                    <FormControl type="number" id="weight" name="weight" placeholder="Weight kg" aria-label="Weight kg" min="0" step="0.1" onChange={this.handleChange} required />
                    <Button className="btn-block ml-3" variant="primary" style={buttonStyle} onClick={this.handleAdd}>Log</Button>
                </InputGroup>
            </div>
        );
    }
}

export default WeightForm;