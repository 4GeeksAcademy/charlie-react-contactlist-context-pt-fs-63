import React, { Component } from "react";
import { BsCupHotFill } from "react-icons/bs";

export const Footer = () => (
	<footer className="footer fixed-bottom bg-secondary text-light py-3 text-center">
		<p>
			Made with  <BsCupHotFill />  by{" "}
			<a className="text-light" href="https://github.com/CWilloughby98">Charlie</a>
		</p>
	</footer>
);
