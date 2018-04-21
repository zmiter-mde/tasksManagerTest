import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Control, Errors } from 'react-redux-form';
import { toastr } from 'react-redux-toastr';

import { isRequired } from '../../utils/validators';
import { login, clearCredentials } from '../../actions/LoginActions';
import { authorise } from '../../utils/auth';

class Login extends Component {

    componentDidMount() {
        this.props.clearCredentials();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-8 col-xs-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                        <Form model="loginForm" onSubmit={(val) => this.login(val)}>
                            <div className="form-group">
                                <label>Username</label>
                                <Errors model=".username"
                                        messages={{
                                            isRequired: 'Please provide a username',
                                        }}
                                        className="errors"
                                />
                                <Control.text model=".username"
                                              className="form-control"
                                              validators={{
                                                  isRequired: isRequired
                                              }}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <Errors model=".password"
                                        messages={{
                                            isRequired: 'Please provide a password',
                                        }}
                                        className="errors"
                                />
                                <Control.text model=".password"
                                              type="password"
                                              className="form-control"
                                              validators={{
                                                  isRequired: isRequired
                                              }}/>
                            </div>
                            <div className="form-group">
                                <Control.button type="submit"
                                                className="btn btn-success right margined-left"
                                                model="loginForm"
                                                disabled={{valid: false}}>
                                    Save
                                </Control.button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    login(credentials) {
        this.props.login(credentials.username, credentials.password)
            .then((res) => {
                authorise(res);
                toastr.success('Success', 'Login successful!');
                this.props.history.push('/dashboard');
            }).catch((res) => {
                toastr.error('Couldn\'t authorize', res.message);
            });
    }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(login(username, password)),
    clearCredentials: () => dispatch(clearCredentials()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));