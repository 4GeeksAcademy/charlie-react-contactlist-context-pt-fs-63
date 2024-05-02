import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar bg-secondary mb-3 p-2">
			<Link to="/">
				<span className="navbar-brand mb-0 ms-3 h1 text-white fs-2 fw-bold">HOME</span>
			</Link>
			<div className="float-end">
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
