import React from 'react';
import { connect } from 'react-redux';
import ParticipantApi from '../../data/ParticipantApi';
import { addTeamMember } from '../../actions/teams';
import classnames from 'classnames';

export class AddTeamMember extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.state = {
      errors: {},
      firstName: String,
      lastName: String,
      email: Number,
      mobile: String
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  handleChange(e) {
    e.preventDefault();
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({ [nam]: val });
  }
  handleSubmit(e) {
    e.preventDefault();
    const route = '/teamDetails/' + this.props.match.params.id;
    let teamDetail = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.mobile,
      participant: this.props.match.params.id
    };
    this.props.addTeamMember(
      teamDetail,
      this.props.history,
      route,
      this.props.history.location.state.teamName
    );
   
  }
  onBackClick(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: '/teamDetails/' + this.props.match.params.id,
      state: { teamName: this.props.history.location.state.teamName }
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div 	className="container justify-content-center align-content-center"
      style={{ maxWidth: "400px", marginTop: "50px" }}>
        <div className="justify-content-center">
        <h1 className="font-bold text-center"
						style={{ marginBottom: "40px" }}>Add Team member</h1>
        </div>
       
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
          <div className="form-group col-md-12">
           
           <input
             className={classnames('form-control cust-input', {
               'is-invalid': errors.firstName
             })}
             type="text"
             name="firstName"
             placeholder="First name"
             onChange={this.handleChange}
           />
           {errors.firstName && (
             <div className="invalid-feedback">{errors.firstName}</div>
           )}
         
       </div>
          </div>

          <div className="form-row">
          <div className="form-group col-md-12">
           
           <input
             className={classnames('form-control cust-input', {
               'is-invalid': errors.lastName
             })}
             type="text"
             name="lastName"
             placeholder="Last name"
             onChange={this.handleChange}
           />
           {errors.lastName && (
             <div className="invalid-feedback">{errors.lastName}</div>
           )}
      
       </div>
          </div>
          
         <div className="form-row">
         <div className="form-group col-md-12">
              <input
                className={classnames('form-control cust-input', {
                  'is-invalid': errors.email
                })}
                type="email"
                name="email"
                placeholder="Email address"
                onChange={this.handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
         
          </div>
         </div>
         
         <div className="form-row">
         <div className="form-group col-md-12">
              <input
                className={classnames('form-control cust-input', {
                  'is-invalid': errors.mobile
                })}
                type="number"
                name="mobile"
                placeholder="Mobile Number"
                onChange={this.handleChange}
              />
              {errors.mobile && (
                <div className="invalid-feedback">{errors.mobile}</div>
              )}
          </div>
         </div>
          
          <div className="form-row justify-content-around" style={{ marginTop: "10px" }}>
          <button className="btn btn-dark" onClick={this.onBackClick}>
          Back
        </button>
          <button className="btn btn-primary" type="submit">
            Add Team Member!
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
  { addTeamMember }
)(AddTeamMember);
