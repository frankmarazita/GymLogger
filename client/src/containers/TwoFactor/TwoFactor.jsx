import React from 'react';

import http from '../../utils/http';
import session from '../../utils/session';
import settings from '../../utils/settings';

import ErrorAuth from '../../components/Error/ErrorAuth'

import './TwoFactor.scss';

class TwoFactor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            twoFactorToken: "",
            errorMessage: ""
        }
    }

    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let stateData = { [name]: value }
        this.setState(stateData)
    }

    handleTokenSubmit = (event) => {
        let error = false

        if (this.state.twoFactorToken === "") {
            this.setState({ errorMessage: "Please enter your two factor token" });
            error = true
        } else if (this.state.twoFactorToken.length !== 6) {
            this.setState({ errorMessage: "Please enter a valid two factor token" });
            error = true
        } else {
            this.setState({ errorMessage: "" });
        }

        if (!error) {
            let data = {
                twoFactorToken: this.state.twoFactorToken
            }

            http.post('/session/twoFactor', data)
            .then((response) => {
                session.setToken(response.data.token)
                const decoded = session.getDecodedToken()
                if (decoded.user.twoFactorValidated) {
                    http.get('/settings')
                    .then((res) => {
                        settings.setSettings(res.data.settings)
                        window.location = '/'
                    })
                    .catch((error) => {
                        console.error(error);
                        window.location = '/'
                    });
                }
            })
            .catch((error) => {
                console.error(error)
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message });
                }
            });
        }
    }

    render = () => {

        return (
            <>
                <div className="container login-form">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto my-5">
                            <div className="card py-3">
                                <div className="card-body">
                                    <h2 className="card-title text-center mb-3">Two Factor</h2>
                                    <div className="form-group mx-3 pt-4">
                                        <input type="text" className="form-control" name="twoFactorToken" placeholder="Two Factor Token" value={this.state.twoFactorToken} onChange={this.handleChange} required autoFocus />
                                    </div>
                                    <div className="form-group mx-3">
                                        <button type="submit" className="btn btn-primary btn-block login-button" onClick={this.handleTokenSubmit}>Submit</button>
                                    </div>
                                    <div className="form-group mx-3">
                                        <ErrorAuth errorMessage={this.state.errorMessage} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-center"><a href="/login">Logout</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default TwoFactor;