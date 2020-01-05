import React from 'react';
import axios from 'axios';
import EventApi from '../../data/EventApi';
import moment from 'moment';
import Options from '../Options';
import PlacesWrapper from '../PlacesWrapper';
import { connect } from 'react-redux';
import { editEvent } from '../../actions/event';
import classnames from 'classnames';

export class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
    this.eventsRoute = '';
    this.state = {
      event: '',
      title: String,
      description: String,
      status: String,
      startDate: String,
      endDate: String,
      location: String,
      eventid: this.props.match.params.id,
      host: String,
      evaluator: String,
      hosts: [],
      evaluators: [],
      errors: {}
    };
  }
  componentDidMount() {
    const BASE_URL = process.env.BASE_URL;
    const { isAdmin } = this.props.auth;
    isAdmin
      ? (this.eventsRoute = '/events')
      : (this.eventsRoute = '/userEvents');

    axios
      .get(`${BASE_URL}/event/edit/` + this.props.match.params.id, {
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
          host: response.data.host,
          evaluator: response.data.evaluator,
          latLng: response.data.latLng
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get(`${BASE_URL}/users/getHosts/`, { crossDomain: true })
      .then(response => {
        // console.log(response.data);
        this.setState({
          hosts: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get(`${BASE_URL}/users/getEvaluators/`, { crossDomain: true })
      .then(response => {
        //console.log(response.data);
        this.setState({
          evaluators: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(e) {
    e.preventDefault();
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
    //console.log({[nam]: val});
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { match, history } = this.props;
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
    let event1 = {
      title,
      description,
      status,
      startDate,
      endDate,
      location,
      host,
      evaluator,
      latLng
    };

    this.props.editEvent(match.params.id, event1, history, this.eventsRoute);
  }
  onBackClick(event) {
    event.preventDefault();
    this.props.history.push(this.eventsRoute);
  }
  getLocation(location) {
    this.setState({ location });
  }
  getLatLng(latLng) {
    this.setState({
      latLng
    });
  }
  render() {
    const hostSelect = (
      <div>
        <label>
          Hosts :
          <select
            value={this.state.host}
            name="host"
            onChange={this.myChangeHandler}
          >
            <option />
            {this.state.hosts.map((optionValue, i) => {
              return (
                <Options
                  key={i}
                  id={optionValue._id}
                  optionValue={
                    optionValue.firstName + ' ' + optionValue.lastName
                  }
                />
              );
            })}
          </select>
        </label>
      </div>
    );
    const { errors } = this.state;
    const { type } = this.props.auth.user;

    return (
      <div
        className="container justify-content-center align-content-center"
        style={{ maxWidth: '400px', marginTop: '50px' }}
      >
        <div className="justify-content-center">
          <h1
            className="font-bold text-center"
            style={{ marginBottom: '40px' }}
          >
            Edit Event
          </h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames('form-control cust-input', {
                  'is-invalid': errors.title
                })}
                type="text"
                name="title"
                defaultValue={this.state.title}
                onChange={this.handleChange}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <textarea
                style={{ height: '150px' }}
                className={classnames('form-control', {
                  'is-invalid': errors.description
                })}
                type="text"
                name="description"
                placeholder="Description"
                defaultValue={this.state.description}
                onChange={this.handleChange}
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
              <label>Status: </label>
              <select
                value={this.state.status}
                name="status"
                onChange={this.handleChange}
                className={classnames('form-control', {
                  'is-invalid': errors.status
                })}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Location : </label>
                <div
                  style={{ width: 'min-content', padding: 0 }}
                  className={classnames('cust-input', {
                    'is-invalid': errors.location
                  })}
                >
                  <PlacesWrapper
                    defaultLocation={this.state.location}
                    location={this.getLocation}
                    latLng={this.getLatLng}
                  />
                </div>
                {errors.location && (
                  <div className="invalid-feedback">{errors.location}</div>
                )}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
              <label>Start Date : </label>
              <input
                className={classnames('form-control', {
                  'is-invalid': errors.startDate
                })}
                type="date"
                name="startDate"
                defaultValue={this.state.startDate}
                onChange={this.handleChange}
              />
              {errors.startDate && (
                <div className="invalid-feedback">{errors.startDate}</div>
              )}
            </div>

            <div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
              <label>End Date : </label>
              <input
                className={classnames('form-control', {
                  'is-invalid': errors.endDate
                })}
                type="date"
                name="endDate"
                defaultValue={this.state.endDate}
                onChange={this.handleChange}
              />
              {errors.endDate && (
                <div className="invalid-feedback">{errors.endDate}</div>
              )}
            </div>
          </div>

          {type !== 'HH' && hostSelect}

          <div className="form-row">
            <div className="form-group col-6 col-md-6">
              <label>Evaluators :</label>
              <select
                className={classnames('form-control', {
                  'is-invalid': errors.evaluator
                })}
                value={this.state.evaluator}
                name="evaluator"
                onChange={this.handleChange}
              >
                <option />
                {this.state.evaluators.map((optionValue, i) => (
                  <Options
                    key={i}
                    id={optionValue._id}
                    optionValue={
                      optionValue.firstName + ' ' + optionValue.lastName
                    }
                  />
                ))}
              </select>
              {errors.evaluator && (
                <div className="invalid-feedback">{errors.evaluator}</div>
              )}
            </div>
          </div>

          <div
            className="form-row justify-content-around"
            style={{ marginTop: '10px' }}
          >
            <button className="btn btn-primary" type="submit">
              Edit Event
            </button>
            <button
              className="btn btn-dark"
              type="submit"
              onClick={this.onBackClick}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editEvent }
)(EditEvent);
