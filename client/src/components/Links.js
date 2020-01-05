import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HomeIcon from "../assets/h-icon.png";

const Links = ({ user, logoutUser, ...props }) => {
	const onLogout = e => {
		e.preventDefault();
		logoutUser(props.history, true);
	};

	const { isAdmin, isAuthenticated, user: userLogged } = user;

	const authLinks = (
		<Nav>
			{isAdmin ? (
				<Nav.Link
					eventKey="1"
					as={NavLink}
					activeClassName="active"
					to="/events"
					className="nav-link"
				>
					Admin Home
				</Nav.Link>
			) : (
				<Nav>
					<Navbar.Text>Welcome {userLogged.name} </Navbar.Text>
					<Nav.Link
						eventKey="2"
						as={NavLink}
						activeClassName="active"
						to="/userEvents"
					>
						User Home
					</Nav.Link>
				</Nav>
			)}

			<Nav.Link href="#" eventKey="3" onClick={onLogout}>
				Logout
			</Nav.Link>
			<Nav>
				{!isAdmin ? (
					<img
						src={`http:${userLogged.avatar}`}
						alt={userLogged.firstName}
						title={userLogged.firstName}
						className="rounded-circle"
						style={{
							width: "25px",
							height: "25px",
							marginRight: "5px"
						}}
					/>
				) : null}
			</Nav>
		</Nav>
	);
	const guestLinks = (
		<Nav>
			<Nav.Link
				eventKey="4"
				as={NavLink}
				activeClassName="active"
				to="/events"
				className="nav-link"
			>
				Admin Home
			</Nav.Link>
			<Nav.Link
				className="nav-link"
				activeClassName="active"
				eventKey="5"
				as={NavLink}
				to="/adduser"
			>
				Register
			</Nav.Link>
			<Nav.Link
				activeClassName="active"
				className="nav-link"
				eventKey="6"
				as={NavLink}
				to="/login"
			>
				Login
			</Nav.Link>
		</Nav>
	);

	return (
		<Navbar className="navbar-shadow" collapseOnSelect bg="dark" variant="dark" expand="lg">
			<Nav.Link
				as={NavLink}
				eventKey="7"
				exact
				activeClassName="active pull-left"
				to={isAdmin ? "/events" : "/"}
			>
				<img
					src={HomeIcon}
					alt=""
					style={{
						height: "25px",
						width: "25px",
						backgroundColor: "#fff",
						borderRadius: "6px"
					}}
				/>
			</Nav.Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					{!isAdmin && !isAuthenticated && guestLinks}
					{!isAdmin && isAuthenticated && authLinks}
					{isAdmin && isAuthenticated && authLinks}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

const mapStateToProps = state => ({
	user: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Links));
