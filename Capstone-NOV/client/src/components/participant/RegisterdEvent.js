import React from 'react';
import { Link } from 'react-router-dom';

export default class RegisterdEvent extends React.Component {
  render() {
    const teamDetailsPath = `/teamDetails/${this.props.id}`;
    const addTeamPath = `/addTeam/${this.props.id}`;
    const editTeamPath = `/editTeam/${this.props.id}`;
    const { teamName, teamSize, ideaSubject, eventName } = this.props;
    return (
      <tr>
        <td>
        
          {eventName}
        </td>
        <td>{teamName}</td>
        <td>{teamSize}</td>
        <td>{ideaSubject}</td>
        <td>
          <Link
            to={{
              pathname: teamDetailsPath,
              state: { teamName }
            }}
          >
            Team Details
          </Link>
        </td>
      
      </tr>
    );
  }
}
