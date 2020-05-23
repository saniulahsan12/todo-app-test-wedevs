import React from 'react';

export default class Loader extends React.Component {
    render() {
        return (
            <span className={this.props.additionalClass === '' ? '' : this.props.additionalClass}>
                <i className={this.props.size !== '' ? 'fa fa-gear fa-spin ' + this.props.size : ''}></i>
            </span>
        );
    }
}