import React from "react";
import AbsoluteWrapper from "./AbsoluteWrapper";

const ErrorPage = () => {
	return (
		<AbsoluteWrapper>
			<div
				className="container justify-content-center align-content-center"
				style={{ marginTop: "50px" }}
			>
				<h1 className="text-center">There was an error !!</h1>
				<h2 className="text-center">Page not allowed</h2>
			</div>
		</AbsoluteWrapper>
	);
};

export default ErrorPage;
