import React from 'react';

export default class TodoStatus extends React.Component {

    render() {
        if (this.props.status && this.props.mode === 'bar') {
            return <div className="todo-indicator bg-success"></div>;
        }

        else if (!this.props.status && this.props.mode === 'bar') {
            return <div className="todo-indicator bg-warning"></div>;
        }
        
        else if (this.props.status && this.props.mode === 'details') {
            return <div className="badge badge-success ml-2">Completed</div>;
        }

        else if (!this.props.status && this.props.mode === 'details') {
            return <div className="badge badge-warning ml-2">Pending</div>;
        }

        else if (this.props.status && this.props.mode === 'icon') {
            return <i className="fa fa-close"></i>;
        }

        else if (!this.props.status && this.props.mode === 'icon') {
            return <i className="fa fa-check"></i>;
        }

        else {
            return;
        }
    }
}