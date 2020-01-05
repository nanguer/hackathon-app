import React from "react";
import { connect } from "react-redux";
import { registerTeam } from "../../actions/authentication";
import classnames from "classnames";
import { TeamDetails } from "./TeamDetails";

export class RegisterForEvent extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
		this.state = {
			eventId: String,
			teamName: String,
			teamSize: String,
			ideaSubject: String,
			ideaSummary: String,
			errors: {}
		};
	}
	componentDidMount() {}
	handleChange(e) {
		e.preventDefault();
		let nam = e.target.name;
		let val = e.target.value;
		this.setState({ [nam]: val });
		
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		let teamDetail = {
			event: this.props.match.params.id,
			teamName: this.state.teamName,
			teamSize: this.state.teamSize,
			ideaSubject: this.state.ideaSubject,
			ideaSummary: this.state.ideaSummary,
			participant: this.props.match.params.participant
		};

		this.props.registerTeam(teamDetail, this.props.history);
	}
	onBackClick(event) {
		event.preventDefault();
		this.props.history.push("/userEvents");
	}

	render() {
		const { errors } = this.state;
		return (
			<div
				className="container justify-content-center align-content-center"
				style={{ maxWidth: "400px", marginTop: "50px" }}
			>
				<div className="justify-content-center">
					<h1
						className="font-bold text-center"
						style={{ marginBottom: "40px" }}
					>
						Team Event Registration
					</h1>
				</div>

				<form onSubmit={this.handleSubmit}>
					<div className="form-group col-md-12 justify-content-center">
						<h5 className="text-center"> Event Name: </h5>
						<p className="text-center">
							<strong>
								{this.props.match.params.description}
							</strong>
						</p>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<input
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.teamName
									}
								)}
								type="text"
								name="teamName"
								placeholder="Team Name"
								defaultValue={this.state.teamName}
								onChange={this.handleChange}
							/>
							{errors.teamName && (
								<div className="invalid-feedback">
									{errors.teamName}
								</div>
							)}
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<input
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.teamSize
									}
								)}
								type="number"
								name="teamSize"
								placeholder="Team Size (number!)"
								defaultValue={this.state.teamSize}
								onChange={this.handleChange}
							/>
							{errors.teamSize && (
								<div className="invalid-feedback">
									{errors.teamSize}
								</div>
							)}
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<input
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.ideaSubject
									}
								)}
								placeholder="Idea Title"
								type="text"
								name="ideaSubject"
								defaultValue={this.state.ideaSubject}
								onChange={this.handleChange}
							/>
							{errors.ideaSubject && (
								<div className="invalid-feedback">
									{errors.ideaSubject}
								</div>
							)}
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<textarea
								className={classnames(
									"form-control cust-input",
									{
										"is-invalid": errors.ideaSubject
									}
								)}
								name="ideaSummary"
								defaultValue={this.state.ideaSummary}
								onChange={this.handleChange}
								placeholder="Insert idea summary..."
							/>
							{errors.ideaSummary && (
								<div className="invalid-feedback">
									{errors.ideaSummary}
								</div>
							)}
						</div>
					</div>
					<div
						className="form-row justify-content-around"
						style={{ marginTop: "10px" }}
					>
						<button
							type="button"
							className="btn btn-dark"
							onClick={this.onBackClick}
						>
							Back
						</button>
						<button className="btn btn-primary" type="submit">
							Submit your Idea!
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authState: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerTeam }
)(RegisterForEvent);
