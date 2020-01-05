import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EventApi from '../../data/EventApi';
import ParticipantEventList from './ParticipantEventList';

export class ParticipantHome extends React.Component {
  constructor(props) {
    super(props);
    this.filterEvents = this.filterEvents.bind(this);
    this.state = {
      events: [],
      filteredEvents: [],
      participantId: ''
    };
  }
  componentDidMount() {
    const { auth } = this.props;
    
    if (!auth.isAuthenticated) {
      this.props.history.push('/login');
    } else {
      if (!(auth.user.type === 'HP') && !auth.isAdmin) {
        this.props.history.push('/error');
      } else {
        EventApi.getEvents(data =>
          this.setState({
            events: data,
            filterEvents: data,
            participantId: auth.user.id
          })
        );
      }
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
    const teameventpath = `/teamEvents/${this.state.participantId}`;
    const { events } = this.state;
    return (
      <div>
        <h1>Hackathon Participant Home</h1>
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
        {events.length > 0 ? <ParticipantEventList
          events={this.state.events}
          participant={this.state.participantId}
        /> : <div style={{ textAlign: 'center' }}>Nothing to see here...</div>}


        {/* Need to discuss */}
        <br />
        <Link to={teameventpath}>My Events</Link>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ParticipantHome);
