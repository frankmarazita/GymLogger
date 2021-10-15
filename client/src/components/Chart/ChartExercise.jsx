import React from 'react';
import { Container } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

import dateUtility from '../../utils/date'

class ChartExercise extends React.Component {

    getDailyMaxData = (exercise) => {
        let data = []
        if (exercise) {
            if (exercise.dailyMax) {
                exercise.dailyMax.map(function (dailyMax) {
                    let date = dateUtility.stringToDate(dailyMax.date)
                    let dateString = dateUtility.toStringYMD(date)
                    return data.push({ x: dateString, y: dailyMax.value });
                })
            }
        }
        return data
    }

    getGoalData = (exercise) => {
        let data = []
        if (exercise) {
            if (exercise.goal) {
                exercise.goal.map(function (goal) {
                    let date = dateUtility.stringToDate(goal.date)
                    let dateString = dateUtility.toStringYMD(date)
                    return data.push({ x: dateString, y: goal.value });
                })
            }
        }
        return data
    }

    render = () => {
        let exercise = this.props.exercise
        let dailyMax = this.getDailyMaxData(exercise)
        let goal = this.getGoalData(exercise)

        let containerStyleChart = { maxWidth: '65%', minWidth: '375px', minHeight: '350px'}
        return (
            <Container className="p-4" style={containerStyleChart}>
                <Line
                    data = {
                        {
                            datasets: [
                                {
                                    label: 'Daily Max',
                                    backgroundColor: 'rgba(51,102,204,1)',
                                    borderColor: 'rgba(51,102,204,1)',
                                    borderWidth: 2,
                                    data: dailyMax,
                                },
                                {
                                    label: 'Goal',
                                    backgroundColor: 'rgba(220,57,18,1)',
                                    borderColor: 'rgba(220,57,18,1)',
                                    borderWidth: 2,
                                    data: goal,
                                }
                            ]
                        }
                    }
                    options = {
                        {
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    // type: 'time',
                                    time: {
                                        // Luxon format string
                                        tooltipFormat: 'DD T'
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'value'
                                    }
                                }
                            }
                        }
                    }
                />
            </Container>
        )
    }

}

export default ChartExercise;