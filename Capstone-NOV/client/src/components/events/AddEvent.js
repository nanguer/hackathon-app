import React from 'react';
import axios from 'axios';
import Options from '../Options';
import PlacesWrapper from '../PlacesWrapper';
import moment from 'moment';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/event';
import classnames from 'classnames';

export class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
    this.state = {
      errors: {},
      title: String,
      description: String,
      status: '',
      startDate: String,
      endDate: String,
      location: String,
      latLng: [],
      hosts: [],
      host: String,
      evaluator: String,
      optionValues: [],
      evaluators: []
    };
  }

  componentDidMount() {
    const BASE_URL = process.env.BASE_URL;

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    } else {
      const defaultDate = moment(Date.now()).format('YYYY-MM-DD');
      axios
        .get(`${BASE_URL}/users/getHosts/`, { crossDomain: true })
        .then(response => {
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
          // console.log(response.data);
          this.setState({
            evaluators: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });

      this.setState({
        status: 'Open'
        //startDate:defaultDate
      });
      if (this.props.auth.user.type === 'HH') {
        this.setState({
          host: this.props.auth.user.id
        });
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  myChangeHandler(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
    // console.log(nam+":"+val);
  }
  onBackClick() {
    this.props.history.goBack();
  }

  getLocation(location) {
    this.setState({
      location
    });
  }

  getLatLng(latLng) {
    this.setState({
      latLng
    });
  }

  handleSubmit(event) {
    let backRoute = '';
    this.props.auth.isAdmin
      ? (backRoute = '/events')
      : (backRoute = '/userEvents');

    event.preventDefault();
    const {
      title,
      description,
      status,
      startDate,
      endDate,
      location,
      latLng,
      host,
      evaluator
    } = this.state;
    let newEvent = {
      title,
      description,
      status,
      startDate,
      endDate,
      location,
      latLng,
      host,
      evaluator
    };

    this.props.addEvent(newEvent, this.props.history, backRoute);
  }
  render() {
    const { errors } = this.state;
    const { type } = this.props.auth.user;
    const hostSelect = (
      <div className="form-group col-md-6">
        <label>Host :</label>
        <select
          value={this.state.host}
          name="host"
          onChange={this.myChangeHandler}
          className={classnames('form-control', {
            'is-invalid': errors.host
          })}
        >
          <option />
          {this.state.hosts.map((optionValue, i) => {
            return (
              <Options
                key={i}
                id={optionValue._id}
                optionValue={optionValue.firstName + ' ' + optionValue.lastName}
              />
            );
          })}
        </select>
        {errors.evaluator && (
          <div className="invalid-feedback">{errors.evaluator}</div>
        )}
      </div>
    );
    //const defaultDate = moment(Date.now()).format('YYYY-MM-DD');
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
            Add Event
          </h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <input
                className={classnames('form-control cust-input', {
                  'is-invalid': errors.title
                })}
                placeholder="Title"
                type="text"
                name="title"
                onChange={this.myChangeHandler}
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
                onChange={this.myChangeHandler}
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
              <label>Status :</label>
              <select
                value={this.state.status}
                name="status"
                onChange={this.myChangeHandler}
                className={classnames('form-control', {
                  'is-invalid': errors.status
                })}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.startDate && (
                <div className="invalid-feedback">{errors.status}</div>
              )}
            </div>

            <div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
              <label>Location :</label>
              <div
                style={{ width: 'min-content', padding: 0 }}
                className={classnames('cust-input', {
                  'is-invalid': errors.location
                })}
              >
                <PlacesWrapper
                  location={this.getLocation}
                  latLng={this.getLatLng}
                />
              </div>
              {errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
              <label>Start Date :</label>
              <input
                className={classnames('form-control', {
                  'is-invalid': errors.startDate
                })}
                type="date"
                name="startDate"
                onChange={this.myChangeHandler}
              />
              {errors.startDate && (
                <div className="invalid-feedback">{errors.startDate}</div>
              )}
            </div>
            <div className="form-group col-12 col-sm-6 col-xs-6 col-md-6">
              <label>End Date :</label>
              <input
                className={classnames('form-control', {
                  'is-invalid': errors.endDate
                })}
                type="date"
                name="endDate"
                onChange={this.myChangeHandler}
              />
              {errors.endDate && (
                <div className="invalid-feedback">{errors.endDate}</div>
              )}
            </div>
          </div>

          {type !== 'HH' && hostSelect}

          <div className="form-group col-md-6">
            <label>Evaluators : </label>
            <select
              className={classnames('form-control', {
                'is-invalid': errors.evaluator
              })}
              value={this.state.evaluator}
              name="evaluator"
              onChange={this.myChangeHandler}
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
          <div
            className="form-row justify-content-around"
            style={{ marginTop: '10px' }}
          >
            <button className="btn btn-dark" onClick={this.onBackClick}>
              Back
            </button>
            <button className="btn btn-danger" type="submit">
              Add Event
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addEvent }
)(AddEvent);
