import React from 'react';
import moment from 'moment-es6';

export default class TodoAdded extends React.Component {

    render() {
        
        if(!this.props.updated) {
            return <div className="widget-subheading"><i>{moment(this.props.created, 'YYYY-MM-DD HH:mm:ss').fromNow()}</i></div>;
        } else {
            return <div className="widget-subheading"><i>{moment(this.props.updated, 'YYYY-MM-DD HH:mm:ss').fromNow()}</i></div>;
        }
    }
}