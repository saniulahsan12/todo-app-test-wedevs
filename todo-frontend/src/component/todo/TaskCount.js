import React from 'react';

export default class TaskCount extends React.Component {
    render() {
        return (
            <div className="card-header-tab card-header">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i className="fa fa-tasks"> </i>&nbsp;Tasks left : <b>&nbsp;{this.props.count}</b>
                </div>
            </div>
        );
    }
}