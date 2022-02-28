import React from 'react';
import { ButtonGroup, Button, Card } from 'react-bootstrap';

import CT from '../../../constants/codeTables'

import IconExerciseType from '../../Icon/IconExerciseType'
import IconTick from '../../Icon/IconTick'

class CardExercise extends React.Component {

    render() {
        let exercise = this.props.exercise
        let exerciseLocation = '/exercise/' + exercise.id

        let exerciseType = ''
        if (exercise.exerciseType === CT.ExerciseType.C.Key.C.Weight.toString()) {
            exerciseType = CT.IconExerciseType.C.Dumbbell
        } else if (exercise.exerciseType === CT.ExerciseType.C.Key.C.MachineWeight.toString()) {
            exerciseType = CT.IconExerciseType.C.Cog
        } else if (exercise.exerciseType === CT.ExerciseType.C.Key.C.MachineLevel.toString()) {
            exerciseType = CT.IconExerciseType.C.Cog
        } else if (exercise.exerciseType === CT.ExerciseType.C.Key.C.Bodyweight.toString()) {
            exerciseType = CT.IconExerciseType.C.WeightHanging
        } else if (exercise.exerciseType === CT.ExerciseType.C.Key.C.Cardio.toString()) {
            exerciseType = CT.IconExerciseType.C.Running
        }

        if (exercise.dailyMax) {
            if (exercise.dailyMax) {
                for (let i = 0; i < exercise.dailyMax.length; i++) {
                    if (!exercise.dailyMaxRecord || exercise.dailyMax[i].value > exercise.dailyMaxRecord) {
                        exercise.dailyMaxRecord = exercise.dailyMax[i].value
                    }
                }
            }

            for (let i = 0; i < exercise.dailyMax.length; i++) {
                if (new Date(exercise.dailyMax[i].date).getTime() > new Date().getTime() - (24 * 60 * 60 * 1000)) {
                    exercise.done = true
                }
            }
        }

        return (
            <>
                <Card className="my-3 shadow-sm" onClick={() => {window.location = exerciseLocation}}>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <Card.Title>{exercise.name}</Card.Title>
                            <IconExerciseType exerciseType={exerciseType} />
                        </div>
                        <Card.Text>{exercise.note}</Card.Text>
                        {exercise.dailyMaxRecord ? <p className="card-text">Max: {exercise.dailyMaxRecord}</p> : ''}
                        <div className="d-flex justify-content-between align-items-center">
                            <ButtonGroup>
                                <Button href={exerciseLocation} variant="outline-secondary">View</Button>
                                <Button href={'/edit/exercise/' + exercise.id} variant="outline-secondary">Edit</Button>
                            </ButtonGroup>
                            {exercise.done ? <IconTick /> : ''}
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default CardExercise;