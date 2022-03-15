import React from 'react';
import { Jumbotron, Container, Button, ButtonGroup } from 'react-bootstrap';
import http from '../../utils/http';

import CT from '../../constants/codeTables'

import CardExerciseGroup from '../../components/Card/ExerciseGroup/CardExerciseGroup'
import CardExerciseGroupNew from '../../components/Card/ExerciseGroup/CardExerciseGroupNew'
import IconExerciseType from '../../components/Icon/IconExerciseType'
import Loading from '../../components/Loading/Loading'

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            exerciseGroups: null,
        }
    }

    componentDidMount() {
        http.get('/users')
        .then((res) => {
            this.setState({ user: res.data.user })
        })
        .catch((error) => {
            console.error(error);
        });

        http.get('/groups')
        .then((res) => {
            this.setState({ exerciseGroups: res.data.exerciseGroups })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render = () => {

        if (!this.state.user || !this.state.exerciseGroups) {
            return (<><Loading /></>)
        }

        let primaryButtonStyle = { width: 160 }
        let secondaryButtonStyle = { width: 100 }

        return (
            <>
                <Jumbotron className="text-center">
                    <Container>
                        <h2>Welcome, {this.state.user ? this.state.user.name : ''}</h2>
                        <p className="lead text-muted">Start by adding an exercise group, and then add exercises to each group. You could create them for days of the week or to target specific muscle groups.</p>
                    </Container>
                    <Container>
                        <Button href="/add/group" variant="primary" className="m-1" style={primaryButtonStyle}>Add New Group</Button>
                        {this.state.exerciseGroups.length > 0 ?
                            <Button href="/add/exercise" variant="secondary" className="m-1" style={primaryButtonStyle} >Add New Exercise</Button>
                        : ''}
                    </Container>
                    <Container className="pt-2">
                        <IconExerciseType exerciseType={CT.IconExerciseType.C.Dumbbell} />
                        <IconExerciseType exerciseType={CT.IconExerciseType.C.Cog} />
                        <IconExerciseType exerciseType={CT.IconExerciseType.C.HandRock} />
                        <IconExerciseType exerciseType={CT.IconExerciseType.C.Running} />
                        <IconExerciseType exerciseType={CT.IconExerciseType.C.WeightHanging} />
                        <IconExerciseType exerciseType={CT.IconExerciseType.C.Weight} />
                        <IconExerciseType exerciseType={CT.IconExerciseType.C.Heartbeat} />
                    </Container>
                    <Container className="pt-4">
                        <ButtonGroup>
                            <Button href="/weight" variant="outline-secondary" style={secondaryButtonStyle}>Weight</Button>
                            <Button href="/heartbeat" variant="outline-secondary" style={secondaryButtonStyle}>Heartbeat</Button>
                        </ButtonGroup>
                    </Container>
                </Jumbotron>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {this.state.exerciseGroups.map((exerciseGroup, i) => <CardExerciseGroup exerciseGroup={exerciseGroup} key={i} />)}
                            <CardExerciseGroupNew />
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default Home;