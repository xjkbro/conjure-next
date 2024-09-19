"use client";
import { getCookie } from "cookies-next";
import React from "react";

export default function Html({ children }) {
	const theme = getCookie("theme") || "dark";
	console.log(theme); // eslint-disable-line no-console
	document.documentElement.setAttribute("data-theme", theme);
	return (
		<html lang="en" data-theme={theme}>
			{children}
		</html>
	);
}
