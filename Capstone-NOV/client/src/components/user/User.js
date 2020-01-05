import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { checkUserType } from '../../actions/user';

export default class User extends React.Component {
  render() {
    const { id, firstName, lastName, doj, userType, email } = this.props;
    const editpath = `editUser/${id}`;
    const deletepath = `deleteUser/${id}`;
    const eventspath = `userEvents/${id}`;

    return (
      <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{moment(doj).format('DD-MM-YYYY')}</td>
        <td>{checkUserType(userType)}</td>
        <td>
          <Link to={`/userEvents/${id}`}>Events</Link>
        </td>
        <td>
          <Link to={editpath}>Edit</Link>
        </td>
        <td>
          <Link to={deletepath}>Delete</Link>
        </td>
      </tr>
    );
  }
}
