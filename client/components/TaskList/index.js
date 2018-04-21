import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Pagination from 'react-js-pagination/dist/Pagination';

import classNames from 'classnames';

import { requestTasks, chooseEditTask } from '../../actions/TasksActions';
import { changeTasksPage, changeSortedBy, changeSortedAsc } from '../../actions/TaskSearchActions';

import { EMAIL, STATUS, TASKS_PER_PAGE, USERNAME } from '../../utils/constants';

import styles from './taskList.scss';

class TaskList extends Component {

    constructor(props) {
        super(props);
        // Because we care about the context for onClick
        this.goEditTask = this.goEditTask.bind(this);
        this.getTaskRow = this.getTaskRow.bind(this);
        this.getTasksTable = this.getTasksTable.bind(this);
    }

    componentDidMount() {
        if (!this.props.tasks || this.props.tasks.length === 0) {
            let sortingObject = this.getSortingObject(this.props.sortedBy, this.props.sortedAsc);
            this.props.requestTasks(this.props.currentPage, sortingObject);
        }
    }

    render() {
        const { tasks } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <h2>Tasks</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-8">
                        {
                        this.props.totalTaskCount &&
                        <Pagination
                            activePage={this.props.currentPage}
                            itemsCountPerPage={TASKS_PER_PAGE}
                            totalItemsCount={this.props.totalTaskCount}
                            pageRangeDisplayed={this.getPagesCount()}
                            onChange={this.changePage.bind(this)} />
                        }
                    </div>
                    <div className="col-xs-4">
                        <div className="right">
                            <Link className={classNames('btn btn-success', styles.marginedTop)} to="/new">Create Task</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        { this.getTasksTable(tasks) }
                    </div>
                </div>
            </div>
        )
    }

    changePage(newPage) {
        this.props.changeTasksPage(newPage);
        let sortingObject = this.getSortingObject(this.props.sortedBy, this.props.sortedAsc);
        this.props.requestTasks(newPage, sortingObject);
    }

    getTasksTable(tasks) {
        if (tasks && tasks.length > 0) {
            return (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className={classNames(styles.clickable, styles.width30percent)}
                                onClick={this.sortBy.bind(this, USERNAME)}>
                                Username
                                {this.props.sortedBy === USERNAME &&
                                <span className={classNames(this.props.sortedAsc ? 'dropdown' : 'dropup', 'right')}>
                                    <span className="caret"></span>
                                </span>}
                            </th>
                            <th className={classNames(styles.clickable, styles.width30percent)}
                                onClick={this.sortBy.bind(this, EMAIL)}>
                                Email
                                {this.props.sortedBy === EMAIL &&
                                <span className={classNames(this.props.sortedAsc ? 'dropdown' : 'dropup', 'right')}>
                                    <span className="caret"></span>
                                </span>}
                            </th>
                            <th className={classNames(styles.clickable, styles.width30percent)}>Text</th>
                            <th className={classNames(styles.clickable, styles.width10percent)}
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

    sortBy(fieldName) {
        let newOrder = this.props.sortedBy === fieldName ? !this.props.sortedAsc : true;
        this.props.changeSortedAsc(newOrder);
        this.props.changeSortedBy(fieldName);
        let sortingObject = this.getSortingObject(fieldName, newOrder);
        this.props.requestTasks(this.props.currentPage, sortingObject);
    }

    getSortingObject(sortedBy, sortedAsc) {
        return {
            field: sortedBy,
            direction: sortedAsc ? 'asc' : 'desc'
        };
    }

    getTaskRow(task) {
        return (
            <tr key={task.id}
                className={styles.clickable}
                onClick={() => {this.goEditTask(task)}}>
                <td>{task.username}</td>
                <td>{task.email}</td>
                <td><div className={styles.ellipsed}>{task.text}</div></td>
                <td>{task.status === 10 ? <span className="glyphicon glyphicon-ok"></span> : ''}</td>
            </tr>
        );
    }

    goEditTask(task) {
        this.props.chooseEditTask({
            id: task.id,
            username: task.username,
            path: task.image_path,
            text: task.text,
            status: task.status,
            email: task.email
        });
        this.props.history.push(`/${task.id}/edit`);
    }

    getPagesCount() {
        const { totalTaskCount: taskCount } = this.props;
        return (taskCount / 3) + (taskCount % 3);
    }

}

const mapStateToProps = state => ({
    tasks: state.tasksReducer.tasks,
    totalTaskCount: state.tasksReducer.totalTaskCount,
    currentPage: state.taskSearchReducer.currentPage,
    sortedAsc: state.taskSearchReducer.sortedAsc,
    sortedBy: state.taskSearchReducer.sortedBy
});

const mapDispatchToProps = dispatch => ({
    requestTasks: (page, sorting) => dispatch(requestTasks(page, sorting)),
    chooseEditTask: (task) => dispatch(chooseEditTask(task)),
    changeTasksPage: (newPage) => dispatch(changeTasksPage(newPage)),
    changeSortedBy: (newSortedBy) => dispatch(changeSortedBy(newSortedBy)),
    changeSortedAsc: (newSortedAsc) => dispatch(changeSortedAsc(newSortedAsc))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskList));
