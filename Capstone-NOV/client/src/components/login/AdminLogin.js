import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginAdmin, logoutUser } from '../../actions/authentication';
import classnames from 'classnames';

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.auth.isAuthenticated) {
      this.props.logoutUser(this.props.history, false);
    }
    const admin = {
      userName: this.state.userName,
      password: this.state.password
    };

    this.props.loginAdmin(admin);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated && this.props.auth.isAdmin) {
      this.props.history.push('/events');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/events');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ marginTop: '50px', width: '700px' }}>
        <h2 style={{ marginBottom: '40px' }}>Admin Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Admin username"
              className={classnames('form-control', {
                'is-invalid': errors.userName
              })}
              name="userName"
              onChange={this.handleInputChange}
              value={this.state.userName}
            />
            {errors.userName && (
              <div className="invalid-feedback">{errors.userName}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
              className={classnames('form-control', {
                'is-invalid': errors.password
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Admin login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AdminLogin.propTypes = {
  errors: PropTypes.object.isRequired,
  loginAdmin: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginAdmin, logoutUser }
)(withRouter(AdminLogin));
