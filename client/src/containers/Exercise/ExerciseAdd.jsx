import React from 'react';
import { Container } from 'react-bootstrap';

import CT from '../../constants/codeTables'

import Back from '../../components/Navigation/Back';
import FormExercise from '../../components/Form/Exercise/FormExercise';

class ExerciseAdd extends React.Component {

    render() {
        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Back path={'/'}/>
                <Container style={containerStyle}>
                    <div className="text-center">
                        <h2>Add Exercise</h2>
                        <p className="lead">Add a new exercise by completing the fields.</p>
                    </div>
                    <FormExercise action={CT.Form.C.Action.C.Add}/>
                </Container>
            </>
        )
    }
}

export default ExerciseAdd;