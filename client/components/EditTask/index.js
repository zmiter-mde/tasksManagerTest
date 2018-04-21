import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Control, Errors } from 'react-redux-form';
import {toastr} from 'react-redux-toastr';
import classNames from 'classnames';

import { isRequired } from '../../utils/validators';

import { editTask, setNewTaskStatus } from '../../actions/TasksActions';
import { isAuthorised } from '../../utils/auth';

class EditTask extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <h2>Manage task</h2>
                        <h5 className={classNames({'hidden': isAuthorised()})}>
                            You need to authorise in order to manage tasks
                        </h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <Form model="editTaskForm" onSubmit={(val) => this.editTask(val)}>
                            <div className="form-group">
                                <label>Username</label>
                                <Control.text model=".username"
                                              className="form-control"
                                              disabled/>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <Control.text model=".email"
                                              type="email"
                                              className="form-control"
                                              disabled/>
                            </div>

                            <div className="form-group">
                                <label>Text</label>
                                <Errors model=".text"
                                        messages={{
                                            isRequired: 'Please provide an email address'
                                        }}
                                        className="errors"
                                />
                                <Control.textarea model=".text"
                                                  className="form-control"
                                                  validators={{
                                                      isRequired: isRequired
                                                  }}
                                                  disabled={!isAuthorised()}/>
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <span className={classNames('glyphicon margined-left',
                                    this.props.editTaskForm.status === 10 ? 'glyphicon-ok' : 'glyphicon-remove')}></span>
                                <button className={classNames('btn btn-danger margined-left', {
                                    'hidden': this.props.editTaskForm.status === 0 || !isAuthorised()
                                })}
                                        onClick={this.toggleCurrentTaskStatus.bind(this)}
                                        type="button">
                                    Resume Task
                                </button>
                                <button className={classNames('btn btn-success margined-left', {
                                    'hidden': this.props.editTaskForm.status === 10 || !isAuthorised()})}
                                        onClick={this.toggleCurrentTaskStatus.bind(this)}
                                        type="button">
                                    Finish Task
                                </button>
                            </div>

                            <div className="form-group">
                                <img src={this.props.editTaskForm.path} alt="No image available"/>
                            </div>

                            <div className="form-group">
                                <Control.button type="submit"
                                                className="btn btn-success right margined-left"
                                                model="editTaskForm"
                                                disabled={(form) => !isAuthorised() || !form.valid}>
                                    Save
                                </Control.button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    toggleCurrentTaskStatus() {
        let newStatus = (this.props.editTaskForm.status + 10) % 20;
        this.props.setNewTaskStatus(newStatus);
    }

    editTask(task) {
        this.props.editTask(task).then(this.handleTaskEdit.bind(this));
    }

    handleTaskEdit(res) {
        if (res.status === 'error') {
            toastr.error('Error', 'Task wasn\'t edited');
        } else {
            toastr.success('Success', 'Task edited!');
        }
    }

}

const mapStateToProps = state => ({
    editTaskForm: state.editTaskForm
});

const mapDispatchToProps = dispatch => ({
    editTask: (task) => dispatch(editTask(task)),
    setNewTaskStatus: (newStatus) => dispatch(setNewTaskStatus(newStatus))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTask));