import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Pagination from 'react-js-pagination/dist/Pagination';

import classNames from 'classnames';

import { requestTasks } from '../../actions/TasksActions';
import { changeTasksPage } from '../../actions/TaskSearchActions';
import { getSortingObject } from '../../utils/sort';

import TasksTable from '../TasksTable/index';

import { TASKS_PER_PAGE } from '../../utils/constants';

import styles from './taskList.scss';

class TaskList extends Component {

    componentDidMount() {
        if (!this.props.tasks || this.props.tasks.length === 0) {
            let sortingObject = getSortingObject(this.props.sortedBy, this.props.sortedAsc);
            this.props.requestTasks(this.props.currentPage, sortingObject);
        }
    }

    render() {
        const { tasks } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <h2>Tasks</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        {
                        this.props.totalTaskCount &&
                        <Pagination
                            activePage={this.props.currentPage}
                            itemsCountPerPage={TASKS_PER_PAGE}
                            totalItemsCount={this.props.totalTaskCount}
                            pageRangeDisplayed={this.getPagesCount()}
                            onChange={this.changePage.bind(this)} />
                        }
                        <div className="right">
                            <Link className={classNames('btn btn-success', styles.marginedTop)} to="/new">Create Task</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        <TasksTable tasks={tasks}/>
                    </div>
                </div>
            </div>
        )
    }

    changePage(newPage) {
        this.props.changeTasksPage(newPage);
        let sortingObject = getSortingObject(this.props.sortedBy, this.props.sortedAsc);
        this.props.requestTasks(newPage, sortingObject);
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
    changeTasksPage: (newPage) => dispatch(changeTasksPage(newPage))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskList));
