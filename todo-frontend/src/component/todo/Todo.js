import React from 'react';
import AppTitle from './AppTitle';
import TaskCount from './TaskCount';
import TaskList from './TaskList';
import AddTodo from './AddTodo';
import Loader from '../common/Loader';
import TodoService from '../../service/todo/TodoService';

export default class Todo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            pending: 0,
            loading: false
        };

        this.parentCallbackHandler = this.parentCallbackHandler.bind(this);
    }

    parentCallbackHandler(todoItem) {
        if (todoItem.case === 'NEW_ENTRY') {
            this.setState({
                todos: [...this.state.todos, todoItem]
            });
            this.setState({
                pending: this.state.todos.filter(todo => todo.status === 0).length
            });
        }
        else if (todoItem.case === 'UPDATE_ENTRY') {
            let index = this.state.todos.findIndex(todo => todo.id === todoItem.id);
            let todos = this.state.todos;
            todos[index].status = todoItem.status;
            todos[index].updated = todoItem.updated;
            todos[index].description = todoItem.description;
            this.setState({
                todos: todos,
                pending: todos.filter(todo => todo.status === 0).length
            });
        }
        else if (todoItem.case === 'DELETE_ENTRY') {
            this.setState({
                todos: this.state.todos.filter(todo => todo.id !== todoItem.id)
            });
            this.setState({
                pending: this.state.todos.filter(todo => todo.status === 0).length
            });
        }
    }

    componentDidMount() {
        this.getAllTasks();
    }

    filterTodo(status) {
        this.setState({
            loading: true
        });
        if(status === -1) {
            this.getAllTasks();
        } else {
            new TodoService().filterTasks(status).then((response) => {
                let todos = response.data.data;
                this.setState({
                    todos: todos,
                    loading: false
                });
            }, (error) => {
                console.log(error);
            });
        }
    }

    removeCompleted(status) {
        this.setState({
            loading: true
        });
        new TodoService().deleteCompletedTask().then((response) => {
            if (response.data.data > 0) {
                this.setState({
                    todos: this.state.todos.filter(todo => todo.status !== status),
                    loading: false
                });
            }
        }, (error) => {
            console.log(error);
        });
    }

    getAllTasks() {
        this.setState({
            loading: true
        });
        new TodoService().getTasks().then((response) => {
            let todos = response.data.data;
            this.setState({
                todos: todos,
                pending: todos.filter(todo => todo.status === 0).length,
                loading: false
            });
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        
        return(
            <div className="col-md-12">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <AppTitle title="👍 My Awesome Todo 🤔"></AppTitle>
                    </div>
                    <div className="col-md-4">
                        <AddTodo passToParentCallback={this.parentCallbackHandler}></AddTodo>

                        <div className="badge badge-info ml-2 filter-box" onClick={() => this.filterTodo(-1)}>All</div>
                        <div className="badge badge-success ml-2 filter-box" onClick={() => this.filterTodo(1)}>Completed</div>
                        <div className="badge badge-warning ml-2 filter-box" onClick={() => this.filterTodo(0)}>Pending</div>
                        <div className="badge badge-danger ml-2 filter-box" onClick={() => this.removeCompleted(1)}>Clear completed</div>

                    </div>
                    <div className="col-md-8">
                        <div className="card-hover-shadow-2x mb-3 card">
                            {
                                !this.state.loading && 
                                <TaskCount count={this.state.pending}></TaskCount>
                            }

                            {
                                this.state.loading && 
                                <Loader additionalClass="loaders" size="fa-5x"></Loader>
                            }

                            {
                                !this.state.loading && 
                                <TaskList todos={this.state.todos} passToParentCallback={this.parentCallbackHandler}></TaskList>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
