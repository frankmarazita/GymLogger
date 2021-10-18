import React from 'react';
import { Container, Button } from 'react-bootstrap';
import http from '../../utils/http';

import Loading from '../../components/Loading/Loading'

class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
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
    }

    render = () => {

        if (!this.state.user) {
            return (<><Loading /></>)
        }

        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Container style={containerStyle}>
                    <div className="pt-5 text-center">
                        <h2>Account</h2>
                    </div>
                    <div className="p-3 text-center">
                        <h5>Name: {this.state.user ? this.state.user.name : ''}</h5>
                        <h5>Email: {this.state.user ? this.state.user.email : ''}</h5>
                        <h5>Timezone: </h5><p>{new Date().toTimeString().slice(9)}</p>
                        <Button href='/edit/account' variant="link">Edit</Button>
                    </div>
                </Container>
            </>
        );
    }

}

export default Account;