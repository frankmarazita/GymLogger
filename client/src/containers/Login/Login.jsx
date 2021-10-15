import React from 'react';

import http from '../../utils/http';
import session from '../../utils/session';

import ErrorAuth from '../../components/Error/ErrorAuth'

import './Login.scss';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }
    }

    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let stateData = { [name]: value }
        this.setState(stateData)
    }

    handleLogin = (event) => {
        let error = false

        if (this.state.email === "") {
            this.setState({ errorMessage: "Please enter your email" });
            error = true
        } else if (this.state.password === "") {
            this.setState({ errorMessage: "Please enter your password" });
            error = true
        } else {
            this.setState({ errorMessage: "" });
        }

        if (!error) {
            let data = {
                email: this.state.email,
                password: this.state.password
            }

            http.post('/login', data)
            .then((response) => {
                session.setToken(response.data.token)
                window.location = '/'
            })
            .catch((error) => {
                console.error(error)
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message });
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="login-form">
                    <h2 className="text-center">Login</h2>
                    <div className="form-group">
                        <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLogin}>Login</button>
                    </div>
                    <ErrorAuth errorMessage={this.state.errorMessage} />
                </div>
                <p className="text-center"><a href="/signup">Sign-up</a></p>
            </div>
        );
    }

}

export default Login;