import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Control } from 'react-redux-form';

import {toastr} from 'react-redux-toastr';

import FilePicker from '../FilePicker';

import { createTask, chooseTask } from '../../actions/TasksActions';
import { changeImage } from '../../actions/ImageActions';

import { USERNAME, EMAIL, IMAGE, TEXT } from '../../utils/constants';

class CreateTask extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <Form model="newTaskForm" onSubmit={(val) => this.createTask(val)}>
                            <div className="form-group">
                                <label>Username</label>
                                <Control.text model=".username"
                                              className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label>Text</label>
                                <Control.textarea model=".text"
                                                  className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <Control.text model=".email"
                                              type="email"
                                              className="form-control"/>
                            </div>

                            <FilePicker handleImageChange={this.handleFileChange.bind(this)}/>

                            <div className="form-group">
                                <button type="submit"
                                        className="btn btn-success right">
                                    Save
                                </button>
                                <button type="button"
                                        className="btn btn-primary right"
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

    handleFileChange(file, path) {
        this.props.changeImage({file: file, path: path});
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
        }

    }

    previewNewTask() {
        this.props.chooseTask({
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
    chooseTask: (task) => dispatch(chooseTask(task)),
    changeImage: (newImage) => dispatch(changeImage(newImage))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTask));