import React from 'react';
import { Container } from 'react-bootstrap';

import Back from '../../components/Navigation/Back';
import FormExerciseGroup from '../../components/Form/ExerciseGroup/FormExerciseGroup';

class ExerciseGroupAdd extends React.Component {

    render() {
        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Back path={'/'}/>
                <Container style={containerStyle}>
                    <div className="text-center">
                        <h2>Add Exercise Group</h2>
                        <p className="lead">Add a new group by completing the fields.</p>
                    </div>
                    <FormExerciseGroup action={'ADD'} />
                </Container>
            </>
        )
    }
}

export default ExerciseGroupAdd;