import React from 'react';

export default class AppTitle extends React.Component {
    render() {
        return (
            <h1>{this.props.title}</h1>
        );
    }
}