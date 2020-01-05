import React from 'react';
import TeamMember from './TeamMember'

export default class TeamMembersList extends React.Component {


  render() {
    var memberNodes = this.props.members.map((member, i) => (
      <TeamMember
        key={i}
        id={member._id}
        firstName={member.firstName}
        lastName={member.lastName}
        email={member.email}
        mobile={member.mobile}
      />
    ));
    return (
      <div>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Frist Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {memberNodes}
          </tbody>
        </table>
      </div>
    );
  }
}
