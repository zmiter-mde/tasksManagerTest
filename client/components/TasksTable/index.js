import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { EMAIL, STATUS, USERNAME } from '../../utils/constants';

import { requestTasks, setTaskToEdit } from '../../actions/TasksActions';
import { changeSortedBy, changeSortedAsc } from '../../actions/TaskSearchActions';

import { getSortingObject } from '../../utils/sort';

import styles from './tasksTable.scss';

class TasksTable extends Component {

    constructor(props) {
        super(props);
        // Because we care about the context for onClick
        this.goEditTask = this.goEditTask.bind(this);
        this.getTaskRow = this.getTaskRow.bind(this);
    }

    render() {
        const { tasks } = this.props;
        if (tasks && tasks.length > 0) {
            return (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th className={classNames('clickable', styles.width30percent)}
                            onClick={this.sortBy.bind(this, USERNAME)}>
                            Username
                            {this.props.sortedBy === USERNAME &&
                            <span className={classNames(this.props.sortedAsc ? 'dropdown' : 'dropup', 'right')}>
                                    <span className="caret"></span>
                                </span>}
                        </th>
                        <th className={classNames('clickable', styles.width30percent)}
                            onClick={this.sortBy.bind(this, EMAIL)}>
                            Email
                            {this.props.sortedBy === EMAIL &&
                            <span className={classNames(this.props.sortedAsc ? 'dropdown' : 'dropup', 'right')}>
                                    <span className="caret"></span>
                                </span>}
                        </th>
                        <th className={classNames('clickable', styles.width30percent)}>Text</th>
                        <th className={classNames('clickable', styles.width10percent)}
                            onClick={this.sortBy.bind(this, STATUS)}>
                            Status
                            {this.props.sortedBy === STATUS &&
                            <span className={classNames(this.props.sortedAsc ? 'dropdown' : 'dropup', 'right')}>
                                    <span className="caret"></span>
                                </span>}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(this.getTaskRow)
                    }
                    </tbody>
                </table>
            );
        } else {
            return <span>No data found...</span>
        }
    }

    getTaskRow(task) {
        return (
            <tr key={task.id}
                className="clickable"
                onClick={() => {this.goEditTask(task)}}>
                <td>{task.username}</td>
                <td>{task.email}</td>
                <td><div className={styles.ellipsed}>{task.text}</div></td>
                <td>
                    <span className={classNames('glyphicon', task.status === 10 ? 'glyphicon-ok' : 'glyphicon-remove')}>
                    </span>
                </td>
            </tr>
        );
    }

    goEditTask(task) {
        this.props.setTaskToEdit({
            id: task.id,
            username: task.username,
            path: task.image_path,
            text: task.text,
            status: task.status,
            email: task.email
        });
        this.props.history.push(`/${task.id}/edit`);
    }

    sortBy(fieldName) {
        let newOrder = this.props.sortedBy === fieldName ? !this.props.sortedAsc : true;
        this.props.changeSortedAsc(newOrder);
        this.props.changeSortedBy(fieldName);
        let sortingObject = getSortingObject(fieldName, newOrder);
        this.props.requestTasks(this.props.currentPage, sortingObject);
    }
}


const mapStateToProps = state => ({
    currentPage: state.taskSearchReducer.currentPage,
    sortedAsc: state.taskSearchReducer.sortedAsc,
    sortedBy: state.taskSearchReducer.sortedBy
});

const mapDispatchToProps = dispatch => ({
    setTaskToEdit: (task) => dispatch(setTaskToEdit(task)),
    requestTasks: (page, sorting) => dispatch(requestTasks(page, sorting)),
    changeSortedBy: (newSortedBy) => dispatch(changeSortedBy(newSortedBy)),
    changeSortedAsc: (newSortedAsc) => dispatch(changeSortedAsc(newSortedAsc))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TasksTable));