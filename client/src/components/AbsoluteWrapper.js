import React from "react";

const AbsoluteWrapper = ({ children }) => {
	return (
		<div
			className="position-absolute w-100"
			style={{ paddingBottom: "15px" }}
		>
			{children}
		</div>
	);
};

export default AbsoluteWrapper;
