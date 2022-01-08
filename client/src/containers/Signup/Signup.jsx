import React from 'react';

import http from '../../utils/http';
import session from '../../utils/session';

import ErrorAuth from '../../components/Error/ErrorAuth'

import './Signup.scss';

class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            errorMessage: ""
        }
    }

    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let stateData = { [name]: value }
        this.setState(stateData)
    }

    handleSignup = (event) => {
        let error = false

        if (this.state.name === "") {
            this.setState({ errorMessage: "Please enter your name" });
            error = true
        } else if (this.state.email === "") {
            this.setState({ errorMessage: "Please enter your email" });
            error = true
        } else if (this.state.password === "") {
            this.setState({ errorMessage: "Please enter your password" });
            error = true
        } else if (this.state.confirmPassword === "") {
            this.setState({ errorMessage: "Please confirm your password" });
            error = true
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMessage: "Passwords do not match" });
            error = true
        } else {
            this.setState({ errorMessage: "" });
        }

        if (!error) {
            let data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            }

            http.post('/users', data)
            .then((response) => {
                session.setToken(response.data.token)
                window.location = '/'
            })
            .catch((error) => {
                this.setState({ errorMessage: error.response.data.message });
            });
        }
    }

    render() {
        return (
            <>
                <div className="container signup-form">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto my-5">
                            <div className="card py-3">
                                <div className="card-body">
                                    <h2 className="card-title text-center mb-3">Sign-up</h2>
                                    <div className="form-group mx-3">
                                        <input type="text" className="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required autoFocus />
                                    </div>
                                    <div className="form-group mx-3">
                                        <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group mx-3">
                                        <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group mx-3">
                                        <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group mx-3">
                                        <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSignup}>Signup</button>
                                    </div>
                                    <div className="form-group mx-3">
                                        <ErrorAuth errorMessage={this.state.errorMessage} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-center"><a href="/login">Login</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default Signup;