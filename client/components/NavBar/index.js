import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

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
                            <li className={this.getActiveLinkClass('/new')}>
                                <Link to="/new">Manage Task</Link>
                            </li>
                            <li className={this.getActiveLinkClass('/login')}>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    getActiveLinkClass(path) {
        return this.props.location.pathname === path ? 'active' : '';
    }
}

export default withRouter(NavBar);