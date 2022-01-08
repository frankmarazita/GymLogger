import React from 'react';

import CT from '../../constants/codeTables'

class ExerciseType extends React.Component {
    render() {
        let exerciseType = this.props.exerciseType
        let component = null

        let iconStyle = { fontSize: '48px' }

        if (exerciseType && exerciseType !== '') {
            let className = 'las'
            if (exerciseType === CT.IconExerciseType.C.Dumbbell) {
                className += ' la-dumbbell'
            } else if (exerciseType === CT.IconExerciseType.C.Cog) {
                className += ' la-cog'
            } else if (exerciseType === CT.IconExerciseType.C.HandRock) {
                className += ' la-hand-rock'
            } else if (exerciseType === CT.IconExerciseType.C.Running) {
                className += ' la-running'
            } else if (exerciseType === CT.IconExerciseType.C.WeightHanging) {
                className += ' la-weight-hanging'
            } else if (exerciseType === CT.IconExerciseType.C.Weight) {
                className += ' la-weight'
            } else {
                className = ''
            }

            component = <i className={className} style={iconStyle}></i>
        }
        return component
    }
}

export default ExerciseType;