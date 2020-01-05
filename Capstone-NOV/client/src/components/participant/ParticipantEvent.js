import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

export class ParticipantEvent extends React.Component {
  render() {
    const {
      title,
      description,
      status,
      startDate,
      endDate,
      location,
      id,
      participant,
      allEvents,
      usersId
    } = this.props;

    const registerPath = `/register/${id}/${title}/${participant}`;
    const detailsPath = `/details/${id}`;
    // console.log(`event teams: ${teams}`);
    // console.log(`user teams: ${userTeams}`);
    // console.log(this.props)

    //THIS FUNCTION DOESN'T WORK AS EXPECTED. NEED TO CHECK.
    const notShowRegister = () => {
      for (let userId of usersId) {
        return userId === this.props.auth.user.id;
      }
    };

    return (
      <tr>
        <td>
          <Link to={detailsPath}>{title}</Link>
        </td>

        <td>{status}</td>

        <td>{location}</td>
        <td>
          {notShowRegister() ? (
            <a to="#" className="disabled">
              Already registered
            </a>
          ) : (
            <Link to={registerPath}>Register</Link>
          )}
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  allEvents: state.event.allEvents
});
export default connect(mapStateToProps)(ParticipantEvent);
