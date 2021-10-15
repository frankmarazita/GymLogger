import React from 'react';
import { Container, Button } from 'react-bootstrap';
import http from '../../utils/http';

import ChartExercise from '../../components/Chart/ChartExercise';
import FormExerciseDailyMax from '../../components/Form/Exercise/FormExerciseDailyMax'
import FormExerciseGoal from '../../components/Form/Exercise/FormExerciseGoal'

class Exercise extends React.Component {

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

    render = () => {

        if (!this.state.exercise) {
            return (<></>)
        }

        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Container style={containerStyle}>
                    <div className="pt-5 text-center">
                        <h2>{this.state.exercise ? this.state.exercise.name : ''}</h2>
                        <p className="lead">{this.state.exercise ? this.state.exercise.note : ''}</p>
                        <Button href={this.state.exercise ? '/edit/exercise/' + this.state.exercise.id : ''} variant="link">Edit</Button>
                    </div>
                </Container>
                <ChartExercise exercise={this.state.exercise} />
                {/* TODO: Add A Range Slider */}
                <Container style={containerStyle}>
                    <div>
                        <FormExerciseDailyMax exercise={this.state.exercise} />
                    </div>
                    <div className="pt-3">
                        <FormExerciseGoal exercise={this.state.exercise} />
                    </div>
                </Container>
                <Container>
                    <div className="p-3 text-center">
                        <Button href={this.state.exercise ? '/data/exercise/' + this.state.exercise.id : ''} variant="secondary">View All Data</Button>
                    </div>
                </Container>
            </>
        );
    }

}

export default Exercise;