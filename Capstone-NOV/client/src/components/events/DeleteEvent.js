import React from 'react';
import EventApi from '../../data/EventApi';

export default class DeleteEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: String
    };
  }
  componentDidMount() {
    EventApi.deleteEvent(
      this.props.match.params.id,
      this.props.history.push,
      '/events'
    );
    //this.props.history.push('/events');
  }

  render() {
    console.log(this.props.match.params.id);
    return false;
  }
}
