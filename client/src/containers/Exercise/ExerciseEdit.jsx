import React from 'react';
import { Container } from 'react-bootstrap';
import http from '../../utils/http';

import CT from '../../constants/codeTables'

import Back from '../../components/Navigation/Back'
import FormExercise from '../../components/Form/Exercise/FormExercise';

class ExerciseEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exerciseID: props.computedMatch.params.id,
            exercise: null
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

    render() {
        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Back/>
                <Container style={containerStyle}>
                    <div className="text-center">
                        <h2>Edit Exercise</h2>
                        <p className="lead">Edit exercise by changing the fields.</p>
                    </div>
                    <FormExercise action={CT.Form.C.Action.C.Edit} exercise={this.state.exercise}/>
                </Container>
            </>
        )
    }
}

export default ExerciseEdit;