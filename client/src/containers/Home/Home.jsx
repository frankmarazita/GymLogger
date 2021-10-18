import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import http from '../../utils/http';

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

        return (
            <>
                <Jumbotron className="text-center">
                    <Container>
                        <h2>Welcome, {this.state.user ? this.state.user.name : ''}</h2>
                        <p className="lead text-muted">Start by adding an exercise group, and then add exercises to each group. You could create them for days of the week or to target specific muscle groups.</p>
                    </Container>
                    <Container>
                        <Button href="/add/group" variant="primary" className="m-1">Add New Group</Button>
                        {this.state.exerciseGroups.length > 0 ? <Button href="/add/exercise" variant="secondary" className="m-1">Add New Exercise</Button> : ''}
                    </Container>
                    <Container className="pt-2">
                        <IconExerciseType exerciseType={'1'} />
                        <IconExerciseType exerciseType={'2'} />
                        <IconExerciseType exerciseType={'4'} />
                        <IconExerciseType exerciseType={'5'} />
                        <i className="las la-weight-hanging" style={{ fontSize: "48px" }}></i>
                        <i className="las la-weight" style={{ fontSize: "48px" }}></i>
                    </Container>
                    <Container className="pt-4">
                        <Button href="/weight" variant="outline-secondary">Log Weight</Button>
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