import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Maps from '../Maps';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share';
import { connect } from 'react-redux';

export class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      event: '',
      title: String,
      description: String,
      status: String,
      startDate: String,
      endDate: String,
      location: String,
      host: String,
      evaluator: String
    };
  }
  componentDidMount() {
    const BASE_URL = process.env.BASE_URL;
    axios
      .get(`${BASE_URL}/event/eventDetails/` + this.props.match.params.id, {
        crossDomain: true
      })
      .then(response => {
        this.setState({
          event: response.data,
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          startDate: moment(response.data.startDate).format('YYYY-MM-DD'),
          endDate: moment(response.data.endDate).format('YYYY-MM-DD'),
          location: response.data.location,
          latLng: response.data.latLng,
          host:
            response.data.hostDetails.firstName +
            ' ' +
            response.data.hostDetails.lastName,
          evaluator:
            response.data.evaluatorDetails.firstName +
            ' ' +
            response.data.evaluatorDetails.lastName
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.goBack();
  }
  render() {
    const shareUrl = `https://hackathon-management.herokuapp.com/${this.props.location.pathname}`;
    const quote = 'Take a look at this hackathon event!';
    const {
      title,
      description,
      status,
      startDate,
      endDate,
      location,
      host,
      evaluator,
      latLng
    } = this.state;
    return (
      <div
        className="container justify-content-center align-content-center"
        style={{ marginTop: '50px' }}
      >
        <div className="container">
          <h1 className="font-bold text-center">Event Details</h1>
        </div>

        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px'
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <div>
              <label className="event-key"> Title :</label> <p>{title}</p>
            </div>
            <div>
              <label className="event-key">Event Description :</label>{' '}
              <p>{description}</p>
            </div>
            <div>
              <label className="event-key">Status : </label>
              <p>{status}</p>
            </div>
            <div>
              <label className="event-key">Start Date :</label>{' '}
              <p>{startDate}</p>
            </div>
            <div>
              <label className="event-key">End Date :</label>{' '}
              <span>{endDate}</span>
            </div>
            <div>
              <label className="event-key">Location :</label>
              <span>{location}</span>
            </div>
            <div>
              <label className="event-key">Host :</label> <span>{host}</span>
            </div>
            <div>
              <label className="event-key">Evaluators :</label>{' '}
              <span>{evaluator}</span>
            </div>
            <div className="container-fluid d-flex justify-content-start">
              <button className="btn btn-info" type="submit">
                Back
              </button>
            </div>
          </form>
          {latLng ? <Maps lat={latLng.lat} lng={latLng.lng} /> : null}
        </div>
        {!this.props.auth.isAdmin ? (
          <div
            className="container d-flex justify-content-center"
            style={{ marginTop: '30px' }}
          >
            <div style={{ cursor: 'pointer' }}>
              <FacebookShareButton url={shareUrl} quote={quote}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <TwitterShareButton url={shareUrl} quote={quote}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <LinkedinShareButton url={shareUrl} quote={quote}>
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(EventDetails);
