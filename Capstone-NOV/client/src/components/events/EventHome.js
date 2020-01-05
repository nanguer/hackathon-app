import React from 'react';
import ReactDOM from 'react-dom';
import EventList from './EventList';
import EventApi from '../../data/EventApi';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class EventHome extends React.Component {
  constructor(props) {
    super(props);
    this.filterEvents = this.filterEvents.bind(this);
    this.state = {
      events: [],
      filteredEvents: []
    };
  }
  componentDidMount() {
    if (!this.props.authState.isAdmin) {
      this.props.history.push('/admin/login');
    } else {
      EventApi.getEvents(data =>
        this.setState({ events: data, filterEvents: data })
      );
    }
  }

  filterEvents(e) {
    let allEvents = this.state.filterEvents;
    let initialEvents = this.state.events;
    allEvents = allEvents.filter(event => {
      return (
        event.description.toLowerCase().search(e.target.value.toLowerCase()) !==
        -1
      );
    });

    if (e.target.value.length <= 0) {
      this.setState({
        events: initialEvents
      });
    }
    this.setState({
      events: allEvents
    });
  }

  render() {
    return (
      <div>
        <h1>Hackathon Events Home</h1>
        <div>
          <label>
            Search by :{' '}
            <input
              type="text"
              placeholder="Search"
              onChange={this.filterEvents}
            />
          </label>
        </div>
        <EventList events={this.state.events} />
        <br />
        <Link to="/addEvent">Add Event</Link>
        <br />
        <Link to="/users">Hackathon User Management</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps)(EventHome);
