import React from 'react';

class ExerciseType extends React.Component {
    render() {
        let exerciseType = this.props.exerciseType
        let component = null

        let iconStyle = { fontSize: '48px' }

        if (exerciseType && exerciseType !== '') {
            let className = 'las'
            if (exerciseType === '1') {
                className += ' la-dumbbell'
            } else if (exerciseType === '2' || exerciseType === '3') {
                className += ' la-cog'
            } else if (exerciseType === '4') {
                className += ' la-hand-rock'
            } else if (exerciseType === '5') {
                className += ' la-running'
            } else {
                className = ''
            }

            component = <i className={className} style={iconStyle}></i>
        }
        return component
    }
}

export default ExerciseType;