import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import RegisteredEventList from './RegisteredEventList';

export class ParticipantEventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.filterEvents = this.filterEvents.bind(this);
    this.onBackClick = this.onBackClick.bind(this);

    this.state = {
      events: [],
      filteredEvents: []
    };
  }
  componentDidMount() {
    const BASE_URL = process.env.BASE_URL;
    axios
      .get(
        `${BASE_URL}/participant/getEventsByParticipantId/` +
          this.props.match.params.id,
        {
          crossDomain: true
        }
      )
      .then(response => {
        this.setState({ events: response.data, filterEvents: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onBackClick() {
    this.props.history.goBack();
  }

  filterEvents(e) {
    let allEvents = this.state.filterEvents;
    let initialEvents = this.state.events;
    allEvents = allEvents.filter(event => {
      return (
        event.teamName.toLowerCase().search(e.target.value.toLowerCase()) !== -1
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
    const { user } = this.props.auth;
    const { events } = this.state;

    return (
      <div>
        <h1>Welcome {user.name}</h1>
        <h2>These are your current events:</h2>
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
        <div>
          {events.length > 0 ? (
            <RegisteredEventList events={events} />
          ) : (
            <div style={{ textAlign: 'center' }}>Nothing to see here...</div>
          )}
        </div>

        <button className="btn btn-dark" onClick={this.onBackClick}>
          Back
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ParticipantEventDetails);
