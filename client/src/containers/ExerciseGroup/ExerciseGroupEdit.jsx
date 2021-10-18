import React from 'react';
import { Container } from 'react-bootstrap';
import http from '../../utils/http';

import Back from '../../components/Navigation/Back';
import FormExerciseGroup from '../../components/Form/ExerciseGroup/FormExerciseGroup';

class ExerciseGroupEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exerciseGroupID: props.computedMatch.params.id,
            exerciseGroup: null
        }
    }

    componentDidMount() {
        http.get('/groups/' + this.state.exerciseGroupID)
        .then((res) => {
            this.setState({ exerciseGroup: res.data.exerciseGroup })
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
                        <h2>Edit Exercise Group</h2>
                        <p className="lead">Edit group by changing the fields.</p>
                    </div>
                    <FormExerciseGroup action={'EDIT'} exerciseGroup={this.state.exerciseGroup}/>
                </Container>
            </>
        )
    }
}

export default ExerciseGroupEdit;