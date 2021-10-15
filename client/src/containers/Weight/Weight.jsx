import React from 'react';
import { Container, Button } from 'react-bootstrap';
import http from '../../utils/http';

import FormWeight from '../../components/Form/Weight/FormWeight';
import ChartWeight from '../../components/Chart/ChartWeight';

class Weight extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            weight: null
        }
    }

    componentDidMount() {
        http.get('/weight')
            .then((res) => {
                this.setState({ weight: res.data.weight })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render = () => {
        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Container style={containerStyle}>
                    <div className="pt-5 text-center">
                        <h2>Weight</h2>
                    </div>
                </Container>
                <ChartWeight weight={this.state.weight} />
                <Container style={containerStyle}>
                    <FormWeight weight={this.state.weight} />
                </Container>
                <Container>
                    <div className="pt-3 text-center">
                        <Button href="/data/weight" variant="secondary">View All Data</Button>
                    </div>
                </Container>
            </>
        );
    }

}

export default Weight;