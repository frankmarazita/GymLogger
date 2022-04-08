import React from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import http from '../../utils/http';

import Back from '../../components/Navigation/Back'
import FormAccountEditTwoFactor from '../../components/Form/Account/FormAccountEditTwoFactor';
import Loading from '../../components/Loading/Loading'

class AccountEditTwoFactor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userID: props.computedMatch.params.id,
            user: null,
            twoFactorData: null,
            qrLoading: true,
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

    onTwoFactorEnabled = (res) => {
        this.setState({ twoFactorData: res.data })
    }

    handleQRLoaded = () => {
        this.setState({ qrLoading: false })
    }

    render() {

        if (!this.state.user) {
            return (<><Loading /></>)
        }

        let containerStyle = { maxWidth: '40%', minWidth: '350px' }

        if (this.state.twoFactorData) {
            return (
                <>
                    <Back />
                    <Container style={containerStyle}>
                        <div className="text-center">
                            <h2>2FA Details</h2>
                            <p className="lead">Please activate your key</p>
                            <div onClick={() => { navigator.clipboard.writeText(this.state.twoFactorData.secret); alert('Copied to clipboard') }}>
                                <div style={{ display: this.state.qrLoading ? "block" : "none" }}>
                                    <Spinner animation="border" variant="dark" />
                                </div>
                                <img src={this.state.twoFactorData.qr} alt="2FA QR Code" onLoad={this.handleQRLoaded} />
                                <div className='pt-2'>
                                    {this.state.twoFactorData.secret}
                                </div>
                            </div>
                            <div className='pt-1'>
                                <Button href={this.state.twoFactorData.uri} variant="link">Add to Authenticator</Button>
                            </div>
                        </div>
                    </Container>
                </>
            );
        }

        return (
            <>
                <Back />
                <Container style={containerStyle}>
                    <div className="text-center">
                        <h2>{!this.state.user.twoFactorEnabled ? 'Enable' : 'Disable'} 2FA</h2>
                        <p className="lead">Provide details to {!this.state.user.twoFactorEnabled ? 'enable' : 'disable'} 2FA</p>
                    </div>
                    <FormAccountEditTwoFactor user={this.state.user} onTwoFactorEnabled={this.onTwoFactorEnabled}/>
                </Container>
            </>
        )
    }
}

export default AccountEditTwoFactor;