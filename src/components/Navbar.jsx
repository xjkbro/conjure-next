"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { getToken } from "@/auth/auth";
import Link from "next/link";

export default function Navbar() {
	const router = useRouter();
	const handleLogout = async () => {
		await getToken();
		const response = await fetch("/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
			},
		});
		console.log(response);
		if (response.ok) {
			router.push("/");
		}
	};
	return (
		<div className="navbar bg-base-100 flex justify-between shadow-md">
			<a className="btn btn-ghost text-xl">daisyUI</a>
			<ul className="flex gap-4">
				<Link href="/dashboard">Dashboard</Link>
				<Link href="/posts">Posts</Link>

				<button className="btn" onClick={handleLogout}>
					Logout
				</button>
			</ul>
		</div>
	);
}
