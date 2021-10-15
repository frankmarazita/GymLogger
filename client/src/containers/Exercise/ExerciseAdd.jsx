import React from 'react';
import { Container } from 'react-bootstrap';

import FormExercise from '../../components/Form/Exercise/FormExercise';

class ExerciseAdd extends React.Component {

    render() {
        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Container style={containerStyle}>
                    <div className="pt-5 text-center">
                        <h2>Add Exercise</h2>
                        <p className="lead">Add a new exercise by completing the fields.</p>
                    </div>
                    <FormExercise action={"ADD"}/>
                </Container>
            </>
        )
    }
}

export default ExerciseAdd;