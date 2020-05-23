import React from 'react';
import TodoService from '../../service/todo/TodoService';
import Loader from '../common/Loader';
import moment from 'moment-es6';

export default class AddTodo extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            todo: '',
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    handleChange(event) {
        this.setState({
            todo: event.target.value
        });
    }

    handleKeypress(event) {
        if (event.key === 'Enter') {
            this.handleSubmit(event);
        }
    }

    handleSubmit(event) {
        let todoVal = this.state.todo;
        if (todoVal) {
            this.setState({
                loading: true
            });
            new TodoService().addTask(todoVal).then((response) => {
                if (response.data.data > 0) {
                    let newTodo = {
                        id: response.data.data,
                        description: todoVal,
                        status: 0,
                        created: moment().format('YYYY-MM-DD HH:mm:ss'),
                        updated: null,
                        case: 'NEW_ENTRY'
                    };
                    this.props.passToParentCallback(newTodo);
                    this.setState({
                        todo: '',
                        loading: false
                    });
                }
            }, (error) => {
                console.log(error);
            });
        }
        event.preventDefault();
    }

    handleClear(event) {
        this.setState({
            todo: ''
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="card-hover-shadow-2x mb-3 card">
                    <div className="d-block text-right card-footer">
                        <input type="text" className="form-control add-todo" placeholder="What's on your mind ..." value={this.state.todo} onKeyDown={this.handleKeypress} onChange={this.handleChange}></input>
                        {this.state.loading && <Loader></Loader>}
                        <button className="mr-2 btn btn-link btn-sm" onClick={this.handleClear}>Cancel</button>
                        <button className="btn btn-outline-primary" type="submit">Add Task</button>
                    </div>
                </div>
            </form>
        );
    }
}