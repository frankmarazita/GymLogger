import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

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

        return (
            <div className="card m-3" onClick={() => {window.location = exerciseLocation}}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{exercise.name}</h5>
                        <IconExerciseType exerciseType={exerciseType} />
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