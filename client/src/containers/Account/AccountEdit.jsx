import React from 'react';
import { Container } from 'react-bootstrap';
import http from '../../utils/http';

import Back from '../../components/Navigation/Back'
import FormAccount from '../../components/Form/Account/FormAccount';

class AccountEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userID: props.computedMatch.params.id,
            user: null
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

    render() {
        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Back/>
                <Container style={containerStyle}>
                    <div className="text-center">
                        <h2>Edit Account</h2>
                        <p className="lead">Edit account by changing the fields.</p>
                    </div>
                    <FormAccount user={this.state.user}/>
                </Container>
            </>
        )
    }
}

export default AccountEdit;