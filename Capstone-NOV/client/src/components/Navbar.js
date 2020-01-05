import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history, true);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <span>
        <NavLink to="/userEvents">
          <button className="btn btn-light btn-sm">User Home</button>
        </NavLink>
        <a
          href="#"
          className="btn btn-light btn-sm"
          onClick={this.onLogout.bind(this)}
        >
          Logout
        </a>
        <span>
          <img
            src={user.avatar}
            alt={user.firstName}
            title={user.firstName}
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
          />
        </span>
      </span>
    );
    const guestLinks = (
      <span>
        <NavLink to="/adduser">
          <button className="btn btn-light btn-sm">Register</button>
        </NavLink>

        <NavLink to="/login">
          <button className="btn btn-light btn-sm">Login</button>
        </NavLink>
      </span>
    );
    return (
      <nav>
        <NavLink exact to="/">
          <button className="btn btn-light btn-sm">Home</button>
        </NavLink>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
