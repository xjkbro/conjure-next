import Navbar from "@/components/Navbar";
import React from "react";
import Providers from "../providers";
import Sidebar from "@/components/Sidebar";

export default function AuthLayout({ children }) {
	return (
		<Providers>
			<Navbar />
			<div className="min-h-full flex">
				<Sidebar />
				<main className="p-4 w-full h-fit">{children}</main>
			</div>
		</Providers>
	);
}
