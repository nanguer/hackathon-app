import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import TeamMembersList from "./TeamMembersList";
import AbsoluteWrapper from "../AbsoluteWrapper";

const TeamDetails = ({ auth, location, ...props }) => {
	const [state, setState] = useState({
		members: [],
		filteredMembers: [],
		participantId: ""
	});
	const { id } = props.match.params;
	const BASE_URL = process.env.BASE_URL;

	useEffect(() => {
		try {
			async function fetchTeam() {
				const res = await axios.get(
					`${BASE_URL}/team/getTeamMembers/${id}`,
					{
						crossDomain: true
					}
				);

				setState({
					members: res.data,
					filteredMembers: res.data,
					participantId: id
				});
			}

			fetchTeam();
		} catch (e) {
			console.log(e);
		}
	}, []);

	const onBackClick = () => {
		props.history.push(`/teamEvents/${auth.user.id}`);
	};

	const filterMembers = e => {
		let allMembers = state.filteredMembers;
		let initialMembers = state.members;
		allMembers = allMembers.filter(member => {
			const fullname = member.firstName + member.lastName;
			return (
				fullname.toLowerCase().search(e.target.value.toLowerCase()) !==
				-1
			);
		});

		if (e.target.value.length <= 0) {
			setState({
				...state,
				members: initialMembers
			});
		}
		setState({
			...state,
			members: allMembers
		});
	};

	const addTeamMemberPath = `/addTeamMember/${state.participantId}`;
	const { teamName } = location.state;

	return (
		<AbsoluteWrapper>
			<div
				className="container justify-content-center align-content-center"
				style={{ marginTop: "50px" }}
			>
				<div className="container row justify-content-center">
					<h1 className="text-center">{teamName} Team Members</h1>
				</div>
				{state.members.length > 0 ? (
					<div className="mb-3 mt-4">
						<label>
							Search by :{" "}
							<input
								type="text"
								placeholder="Search"
								onChange={filterMembers}
							/>
						</label>
					</div>
				) : null}
				{state.members.length > 0 ? (
					<TeamMembersList members={state.members} />
				) : (
					<div
						style={{
							fontWeight: "700",
							textAlign: "center",
							marginTop: "20px"
						}}
					>
						No members yet!!
					</div>
				)}

				<br />
				<div
					className="form-row justify-content-around"
					style={{ marginTop: "10px" }}
				>
					<button className="btn btn-secondary" onClick={onBackClick}>
						Back
					</button>

					<Link
						className="btn btn-primary"
						to={{
							pathname: addTeamMemberPath,
							state: { teamName }
						}}
					>
						Add Team Member
					</Link>
				</div>
			</div>
		</AbsoluteWrapper>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(withRouter(TeamDetails));
