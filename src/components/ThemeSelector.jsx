"use client";
import { setCookie, getCookie } from "cookies-next";
import React, { useEffect } from "react";

export default function ThemeSelector() {
	const themes = [
		"light",
		"dark",
		"cupcake",
		"bumblebee",
		"emerald",
		"corporate",
		"synthwave",
		"retro",
		"cyberpunk",
		"valentine",
		"halloween",
		"garden",
		"forest",
		"aqua",
		"lofi",
		"pastel",
		"fantasy",
		"wireframe",
		"black",
		"luxury",
		"dracula",
		"cmyk",
		"autumn",
		"business",
		"acid",
		"lemonade",
		"night",
		"coffee",
		"winter",
		"dim",
		"nord",
		"sunset",
	];
	const [theme, setTheme] = React.useState("dark");
	const handleChange = (e) => {
		console.log(e.target.value);
		setCookie("theme", e.target.value);
		setTheme(e.target.value);

		document.documentElement.setAttribute("data-theme", e.target.value);
	};
	useEffect(() => {
		setTheme(getCookie("theme") || "dark");
	}, []);
	return (
		<select
			className="select select-bordered w-full max-w-xs"
			onChange={handleChange}
			value={theme}
		>
			{themes.map((theme) => (
				<option key={theme} value={theme}>
					{theme}
				</option>
			))}
		</select>
	);
}
