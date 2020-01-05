import React from 'react';
import axios from 'axios';
import EventList from '../events/EventList';
import EventApi from '../../data/EventApi';
import ParticipantEventList from '../participant/ParticipantEventList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkUserType } from '../../actions/user';
import { setAllEvents } from '../../actions/event';

export class UserEvents extends React.Component {
  constructor(props) {
    super(props);
    this.filterEvents = this.filterEvents.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.state = {
      events: [],
      filterEvents: [],
      user: {}
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    const BASE_URL = process.env.BASE_URL;

    let hostvalue;
    if (!auth.isAuthenticated) {
      this.props.history.push('/login');
    } else {
      if (auth.user.type === 'Hj') {
        this.props.history.push('/error');
      } else {
        auth.isAdmin
          ? (hostvalue = this.props.match.params.id)
          : (hostvalue = this.props.user.id);
        let eventData = [];
        let userData = {};
        axios.get(`${BASE_URL}/users/getUser/` + hostvalue).then(user => {
          userData = user.data;
          this.setState(
            {
              user: userData
            },
            () => {
              switch (this.state.user.userType) {
                case 'HH':
                  axios
                    .get(`${BASE_URL}/event/getHostEvents/` + hostvalue, {
                      crossDomain: true
                    })
                    .then(eventsArr => {
                      this.setState(
                        {
                          events: eventsArr.data,
                          filterEvents: eventsArr.data
                        },
                        () => console.log(this.state)
                      );
                    })
                    .catch(err => console.log(err));
                  break;
                case 'HE':
                  axios
                    .get(`${BASE_URL}/event/getEvaluatorsEvents/` + hostvalue, {
                      crossDomain: true
                    })
                    .then(eventsArr => {
                      this.setState({
                        events: eventsArr.data,
                        filterEvents: eventsArr.data
                      });
                    })
                    .catch(err => console.log(err));
                  break;
                case 'HP':
                  EventApi.getEvents(data => {
                    const eventArr = data.map(event => {
                      return { id: event._id, teams: event.teams };
                    });
                    this.props.setAllEvents(eventArr);
                    this.setState({
                      events: data,
                      filterEvents: data,
                      participantId: auth.user.id
                    });
                  });

                default:
                  null;
              }
            }
          );
        });
      }
    }
  }
  onBackClick() {
    this.props.history.push('/users');
  }

  filterEvents(e) {
    let allEvents = this.state.filterEvents;
    let initialEvents = this.state.events;

    allEvents = allEvents.filter(event => {
      return (
        event.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
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
    const subtitle = {
      HE: 'evaluate',
      HP: 'enroll!!'
    };
    const { name, type } = this.props.user;
    const { isAdmin } = this.props.auth;
    const { firstName, lastName } = this.state.user;
    const { events, participantId } = this.state;
    const teameventpath = `/teamEvents/${participantId}`;
    const userType = checkUserType(type);

    return (
      <div
        className="container justify-content-center align-content-center"
        style={{ marginTop: '50px' }}
      >
        {!isAdmin ? (
          <div className="justify-content-center">
            <h1
              className="font-bold text-center"
              style={{ marginBottom: '20px' }}
            >
              Hackathon {userType} Home
            </h1>
          </div>
        ) : (
          <div>
            <h1>Welcome {isAdmin ? 'Admin' : name}</h1>
            <h4>Now viewing {`${firstName} ${lastName}'s `} events</h4>
          </div>
        )}
        {!isAdmin ? (
          <div className="mb-3">
            {type === 'HH' ? (
              <div className="justify-content-center">
                <h3 className="text-center">Your Events: </h3>
              </div>
            ) : (
              <div className="justify-content-center">
                <h3 className="text-center">
                  List of available events to {subtitle[type]}
                </h3>
              </div>
            )}
          </div>
        ) : null}

        <div className="mb-3 mt-4">
          <label>Search by title:</label>
          <input
            className="ml-3"
            type="text"
            placeholder="Search"
            onChange={this.filterEvents}
          />
        </div>

        {events.length > 0 ? (
          userType === 'Participant' ? (
            <ParticipantEventList events={events} participant={participantId} />
          ) : (
            <EventList events={events} />
          )
        ) : (
          <div style={{ textAlign: 'center' }}>Nothing to see here...</div>
        )}

        {type === 'HP' ? (
          <div>
            <br />
            <Link to={teameventpath}>My Events</Link> <br />
          </div>
        ) : null}

        {type === 'HH' ? (
          <div>
            <br />
            <Link to="/addEvent">Add Event</Link>
          </div>
        ) : null}

        {isAdmin ? (
          <button className="btn btn-dark" onClick={this.onBackClick}>
            Back
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAllEvents }
)(withRouter(UserEvents));
