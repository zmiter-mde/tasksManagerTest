import React from 'react';
import { Field, reduxForm } from 'redux-form';

import FilePicker from '../../FilePicker/index';

const required = value => value ? undefined : 'Required';
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label>{label}</label> {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        <input {...input} placeholder={label} type={type} className="form-control"/>
    </div>
);

let TaskForm = props => {
    const {
        handleSubmit,
        handleFileChange,
        previewNewTask,
        onSubmit,
        pristine,
        reset,
        submitting,
    } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field name="username"
                   label="Username"
                   component={renderField}
                   type="text"
                   className="form-control"
                   validate={required} />
            <Field name="email"
                   label="Email"
                   component={renderField}
                   type="text"
                   className="form-control"
                   validate={[required, email]} />
            <Field name="text"
                   label="Text"
                   component={renderField}
                   type="text"
                   className="form-control"
                   validate={required} />

            <FilePicker handleImageChange={handleFileChange}/>

            <div className="form-group">
                <button type="submit"
                        className="btn btn-success right"
                        disabled={pristine || submitting}>
                    Save
                </button>
                <button type="button"
                        className="btn btn-primary right"
                        onClick={previewNewTask}>
                    Preview
                </button>
            </div>
        </form>
    );
};

TaskForm = reduxForm({form: 'creationForm'})(TaskForm);

export default TaskForm;