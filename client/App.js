import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import NavBar from './components/NavBar';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import ViewTask from './components/ViewTask';
import EditTask from './components/EditTask';

class App extends Component {

    render() {
        return (
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path={'/'} render={() => (<Redirect to="/dashboard"/>)} />
                    <Route exact path={'/dashboard'} component={TaskList} />
                    <Route exact path={'/new'} component={CreateTask} />
                    <Route exact path={'/:id'} component={ViewTask} />
                    <Route exact path={'/preview'} component={ViewTask} />
                    <Route exact path={'/:id/edit'} component={EditTask} />
                </Switch>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="bottom-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar/>
            </div>
        );
    }
}

export default App;