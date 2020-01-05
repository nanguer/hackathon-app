import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import TeamMembersList from './TeamMembersList';

export class TeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.filterMembers = this.filterMembers.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.state = {
      members: [],
      filteredMembers: [],
      participantId: ''
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    const BASE_URL = process.env.BASE_URL;
 
    axios
      .get(`${BASE_URL}/team/getTeamMembers/` + id, {
        crossDomain: true
      })
      .then(response => {
        this.setState({
          members: response.data,
          filteredMembers: response.data,
          participantId: id
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onBackClick() {
    this.props.history.goBack();
  }

  filterMembers(e) {
    let allMembers = this.state.filteredMembers;
    let initialMembers = this.state.members;
    allMembers = allMembers.filter(member => {
      member.fullName = member.firstName + member.lastName;
        return (
          member.fullName.toLowerCase().search(e.target.value.toLowerCase()) !==
          -1
        );
     
      
    });

    if (e.target.value.length <= 0) {
      this.setState({
        members: initialMembers
      });
    }
    this.setState({
      members: allMembers
    });
  }

  render() {
    const addTeamMemberPath = `/addTeamMember/${this.state.participantId}`;
    return (
      <div>
        <h1>{this.props.history.location.state.teamName} Team Members</h1>
        <div>
          <label>
            Search by :{' '}
            <input
              type="text"
              placeholder="Search"
              onChange={this.filterMembers}
            />
          </label>
        </div>
        <TeamMembersList members={this.state.members} />
      
        <br />
        <Link
          to={{
            pathname: addTeamMemberPath,
            state: { teamName: this.props.history.location.state.teamName }
          }}
        >
          Add Team Member
        </Link>
        <br />
        <button className="btn btn-dark" onClick={this.onBackClick}>
          Back
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TeamDetails);
