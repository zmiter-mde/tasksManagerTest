import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ViewTask extends Component {

    render() {
        const { currentTask: task } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 form-group">
                        <h2>Task Preview</h2>
                        <Link className="btn btn-primary right" to="/new">Back to Creation</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Task Overview</h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-2">
                                        <label>Username:</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <span>{task.username}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-2">
                                        <label>Email:</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <span>{task.email}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-2">
                                        <label>Status:</label>
                                    </div>
                                    <div className="col-xs-10">
                                        {task.status === 10 ?
                                            <span className="glyphicon glyphicon-ok"></span> :
                                            <span className="glyphicon glyphicon-remove"></span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-2">
                                        <label>Text:</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <span>{task.text}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-2">
                                        <label>Image:</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <img src={task.image_path} alt="No image selected"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentTask: state.tasksReducer.currentTask
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTask);