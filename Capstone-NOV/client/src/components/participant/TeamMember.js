import React from 'react';
import { Link } from 'react-router-dom';

export default class TeamMember extends React.Component {
  render() {
    const teamDetailsPath = `/teamDetails/${this.props.id}`;
    const addTeamPath = `/addTeam/${this.props.id}`;
    const editTeamPath = `/editTeam/${this.props.id}`;

    return (
      <tr>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.email}</td>
        <td>{this.props.mobile}</td>
      
      </tr>
    );
  }
}
