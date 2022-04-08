import React from 'react';
import { Container, Button } from 'react-bootstrap';
import http from '../../utils/http';

import Back from '../../components/Navigation/Back';
import CardExercise from '../../components/Card/Exercise/CardExercise'
import Loading from '../../components/Loading/Loading'

class ExerciseGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exerciseGroupID: props.computedMatch.params.id,
            exerciseGroup: null,
            exercises: null
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

        http.get('/groups/' + this.state.exerciseGroupID + '/exercises')
        .then((res) => {
            this.setState({ exercises: res.data.exercises })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render = () => {

        if (!this.state.exerciseGroup || !this.state.exercises) {
            return (<><Loading /></>)
        }

        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Back path='/'/>
                <Container style={containerStyle}>
                    <div className="text-center">
                        <h2>{this.state.exerciseGroup ? this.state.exerciseGroup.name : ''}</h2>
                        <p className="lead">{this.state.exerciseGroup ? this.state.exerciseGroup.note : ''}</p>
                        <Button href={this.state.exerciseGroup ? '/edit/group/' + this.state.exerciseGroup.id : ''} variant="link">Edit</Button>
                    </div>
                    {this.state.exercises.map((exercise, i) => <CardExercise exercise={exercise} key={i} />)}
                    <div className="py-3 text-center">
                        <Button href="/add/exercise" variant="primary">Add New Exercise</Button>
                    </div>
                </Container>
            </>
        );
    }

}

export default ExerciseGroup;