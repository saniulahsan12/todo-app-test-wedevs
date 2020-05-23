import React from 'react';
import TodoStatus from './TodoStatus';
import TodoTime from './TodoTime';
import Loader from '../common/Loader';
import TodoService from '../../service/todo/TodoService';
import moment from 'moment-es6';

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todo: '',
            editTodo: '',
            editTodoId: null,
            editTodoStatus: 0,
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    handleChange(event) {
        this.setState({
            editTodo: event.target.value
        });
    }

    handleKeypress(event) {
        if (event.key === 'Enter') {
            this.handleUpdateSubmit(event);
        }
    }

    handleUpdate(todo) {
        let newTodo = {
            id: todo.id,
            status: todo.status === 1 ? 0 : 1,
            description: todo.description
        };
        this.updateTask(newTodo);
    }

    handleEdit(todo) {
        this.setState({
            editTodo: todo.description,
            editTodoId: todo.id,
            editTodoStatus: todo.status
        });
    }

    handleDelete(todo) {
        new TodoService().deleteTask(todo.id).then((response) => {
            if (response.data.data > 0) {
                let newTodo = {
                    ...todo,
                    case: 'DELETE_ENTRY'
                };
                this.props.passToParentCallback(newTodo);
            }
        }, (error) => {
            console.log(error);
        });
    }

    handleUpdateSubmit(event) {
        let newTodo = {
            id: this.state.editTodoId,
            status: this.state.editTodoStatus,
            description: this.state.editTodo
        };
        this.updateTask(newTodo);
    }

    updateTask(newTodo) {
        this.setState({
            loading: true
        });
        new TodoService().updateTask(newTodo).then((response) => {
            if (response.data.data > 0) {
                newTodo = {
                    ...newTodo,
                    created: null,
                    updated: moment().format('YYYY-MM-DD HH:mm:ss'),
                    case: 'UPDATE_ENTRY'
                };
                this.props.passToParentCallback(newTodo);
                this.destroyEditState();

                this.setState({
                    loading: false
                });
            }
        }, (error) => {
            console.log(error);
        });
    }

    destroyEditState() {
        this.setState({
            editTodo: '',
            editTodoId: null,
            editTodoStatus: 0
        });
    }


    render() {

        let todos = this.props.todos;

        return(
            <ul className="list-group list-group-flush">
                {
                    todos.map((todo, index) => {
                        return (
                            
                            <li key={todo.id} className="list-group-item">
                                <TodoStatus mode="bar" status={todo.status}></TodoStatus>
                                <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left ml-2">
                                            <div className="widget-heading">
                                                <span className={todo.status === 1 ? 'task-completed' : 'not-completed'}>{todo.description}</span>
                                                <TodoStatus mode="details" status={todo.status}></TodoStatus>
                                                &nbsp;
                                                {this.state.loading && this.state.editTodoId === todo.id && <Loader></Loader>}
                                            </div>
                                            <TodoTime created={todo.created} updated={todo.updated}></TodoTime>
                                            {
                                                this.state.editTodoId === todo.id &&
                                                <input type="text" className="form-control edit-todo" placeholder="Changed your mind ...?" value={this.state.editTodo} onKeyDown={this.handleKeypress} onChange={this.handleChange}></input>
                                            }
                                        </div>
                                        <div className="widget-content-right">
                                            <button className="border-0 btn-transition btn btn-outline-success" onClick={() => this.handleUpdate(todo)}>
                                                <TodoStatus mode="icon" status={todo.status}></TodoStatus>
                                            </button>
                                            <button className = "border-0 btn-transition btn btn-outline-primary" onClick={() => this.handleEdit(todo)}>
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button className="border-0 btn-transition btn btn-outline-danger" onClick={() => this.handleDelete(todo)}>
                                                <i className="fa fa-power-off"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

