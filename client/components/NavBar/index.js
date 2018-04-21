import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import classNames from 'classnames';

import { isAuthorised, logout } from '../../utils/auth';

class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className={classNames({'active': this.isActivePath('/new')})}>
                                <Link to="/new">Create Task</Link>
                            </li>
                            <li className={classNames({'active': this.isActivePath('/login'), 'hidden': isAuthorised()})}>
                                <Link to="/login">Login</Link>
                            </li>
                            <li className={classNames({'hidden': !isAuthorised()})}>
                                <Link to="/dashboard"
                                      onClick={() => {logout()}}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    isActivePath(path) {
        return this.props.location.pathname === path;
    }

}

export default withRouter(NavBar);