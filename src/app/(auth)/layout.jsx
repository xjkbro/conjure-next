import Navbar from "@/components/Navbar";
import React from "react";
import Providers from "../providers";

export default function AuthLayout({ children }) {
	return (
		<Providers>
			<Navbar />
			<div className="p-2">{children}</div>
		</Providers>
	);
}
