import React from "react";
import UserLogin from "../components/login/UserLogin";
import { useSpring, animated } from "react-spring";
import BackgroundImage from "../assets/bg-min.jpg";
import AbsoluteWrapper from "./AbsoluteWrapper";

const LandingPage = () => {
	const props = useSpring({
		backgroundImage: `url(${BackgroundImage})`,
		backgroundSize: "cover",
		height: "100%",
		opacity: 1,
		overflow: "overlay",
		from: { opacity: 0 }
	});
	return (
		<animated.div
			className="container-fluid d-flex justify-content-end align-items-center"
			style={props}
		>
			<UserLogin />
		</animated.div>
	);
};

export default LandingPage;
