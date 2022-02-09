import React from 'react';
import { Container } from 'react-bootstrap';

import Back from '../../components/Navigation/Back'
import FormAccountEditPassword from '../../components/Form/Account/FormAccountEditPassword';

class AccountEditPassword extends React.Component {

    render() {
        let containerStyle = { maxWidth: '40%', minWidth: '350px' }
        return (
            <>
                <Back/>
                <Container style={containerStyle}>
                    <div className="text-center">
                        <h2>Change Password</h2>
                        <p className="lead">Change password by completing the fields.</p>
                    </div>
                    <FormAccountEditPassword/>
                </Container>
            </>
        )
    }
}

export default AccountEditPassword;