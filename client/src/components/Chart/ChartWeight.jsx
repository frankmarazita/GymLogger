import React from 'react';
import { Container } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

import dateUtility from '../../utils/date'

class ChartWeight extends React.Component {

    getWeightData = (weight) => {
        let data = []
        if (weight) {
            weight.map(function (weight) {
                let date = dateUtility.stringToDate(weight.date)
                let dateString = dateUtility.toStringYMD(date)
                return data.push({ x: dateString, y: weight.value });
            })
        }
        return data
    }

    render = () => {
        let weight = this.getWeightData(this.props.weight)

        let containerStyleChart = { maxWidth: '65%', minWidth: '375px', minHeight: '400px' }
        return (
            <Container className="p-4" style={containerStyleChart}>
                <Line
                    data={
                        {
                            datasets: [
                                {
                                    label: 'Weight',
                                    backgroundColor: 'rgba(51,102,204,1)',
                                    borderColor: 'rgba(51,102,204,1)',
                                    borderWidth: 2,
                                    data: weight,
                                    pointRadius: 0,
                                }
                            ]
                        }
                    }
                    options={
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

export default ChartWeight;