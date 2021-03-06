import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Control, Errors } from 'react-redux-form';
import { toastr } from 'react-redux-toastr';

import { isEmail, isRequired } from '../../utils/validators';

import FilePicker from '../FilePicker';

import { createTask, setTaskToView, setTaskToCreate } from '../../actions/TasksActions';
import { changeImage } from '../../actions/ImageActions';

import { USERNAME, EMAIL, IMAGE, TEXT } from '../../utils/constants';
import { initialTaskFormState } from '../../utils/formInitialStates';

class CreateTask extends Component {

    filePicker = undefined;

    componentDidMount() {
        this.filePicker.setImage(this.props.newImage);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <h2>Create Task</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <Form model="newTaskForm" onSubmit={(val) => this.createTask(val)}>
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
                                <label>Email</label>
                                <Errors model=".email"
                                        messages={{
                                            isRequired: 'Please provide an email address',
                                            isEmail: 'Not a valid email',
                                        }}
                                        className="errors"
                                />
                                <Control.text model=".email"
                                              type="email"
                                              className="form-control"
                                              validators={{
                                                  isRequired: isRequired,
                                                  isEmail: isEmail
                                              }}/>
                            </div>

                            <div className="form-group">
                                <label>Text</label>
                                <Errors model=".text"
                                        messages={{
                                            isRequired: 'Please provide a text value',
                                        }}
                                        className="errors"
                                />
                                <Control.textarea model=".text"
                                                  className="form-control"
                                                  validators={{
                                                      isRequired: isRequired
                                                  }}/>
                            </div>

                            <FilePicker handleImageChange={this.handleFileChange.bind(this)}
                                        ref={instance => { this.filePicker = instance; }}/>

                            <div className="form-group">
                                <Control.button type="submit"
                                                className="btn btn-success right margined-left"
                                                model="newTaskForm"
                                                disabled={(form) => !this.props.newImage.file ||
                                                                    !this.props.newImage.typeAccepted ||
                                                                    !form.valid}>
                                    Save
                                </Control.button>
                                <button type="button"
                                        className="btn btn-primary right margined-left"
                                        onClick={this.previewNewTask.bind(this)}>
                                    Preview
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    handleFileChange(file, path, typeAccepted) {
        this.props.changeImage({file: file, path: path, typeAccepted: typeAccepted});
    }

    createTask(values) {
        let data = new FormData();
        data.append(IMAGE, this.props.newImage.file);
        data.append(USERNAME, values.username);
        data.append(EMAIL, values.email);
        data.append(TEXT, values.text);
        this.props.createTask(data).then(this.handleTaskCreation.bind(this));
    }

    handleTaskCreation(res) {
        if (res.status === 'error') {
            toastr.error('Error', 'Task wasn\'t created');
        } else {
            toastr.success('Success', 'Task created!');
            this.props.setTaskToCreate(initialTaskFormState);
            this.props.changeImage({});
            this.filePicker.setImage({});
        }

    }

    previewNewTask() {
        this.props.setTaskToView({
            ...this.props.newTaskForm,
            status: 0,
            image_path: this.props.newImage.path
        });
        this.props.history.push('/preview');
    }

}

const mapStateToProps = state => ({
    newTaskForm: state.newTaskForm,
    newImage: state.imageReducer.newImage
});

const mapDispatchToProps = dispatch => ({
    createTask: (task) => dispatch(createTask(task)),
    setTaskToView: (task) => dispatch(setTaskToView(task)),
    setTaskToCreate: (task) => dispatch(setTaskToCreate(task)),
    changeImage: (newImage) => dispatch(changeImage(newImage))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTask));