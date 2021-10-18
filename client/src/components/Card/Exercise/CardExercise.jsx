import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import IconExerciseType from '../../Icon/IconExerciseType'
import IconTick from '../../Icon/IconTick'

class CardExercise extends React.Component {

    render() {
        let exercise = this.props.exercise
        let exerciseLocation = '/exercise/' + exercise.id
        return (
            <div className="card m-3" onClick={() => {window.location = exerciseLocation}}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{exercise.name}</h5>
                        <IconExerciseType exerciseType={exercise.exerciseType} />
                    </div>
                    <p className="card-text">{exercise.note}</p>
                    {exercise.dailyMaxRecord ? <p className="card-text">Max: {exercise.dailyMaxRecord}</p> : ''}
                    <div className="d-flex justify-content-between align-items-center">
                        <ButtonGroup>
                            <Button href={exerciseLocation} variant="outline-secondary">View</Button>
                            <Button href={'/edit/exercise/' + exercise.id} variant="outline-secondary">Edit</Button>
                        </ButtonGroup>
                        {exercise.done ? <IconTick /> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default CardExercise;