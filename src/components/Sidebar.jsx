import Link from "next/link";
import React from "react";

export default function Sidebar({ items }) {
	return (
		<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
			<ul>
				<li className="menu-title">Main</li>
			</ul>
			<li>
				<Link href="/dashboard">Dashboard</Link>
			</li>
			<li>
				<Link href="/categories">Categories</Link>
			</li>
			<li>
				<Link href="/posts">Posts</Link>
			</li>
			<li>
				<Link href="/posts">Products</Link>
			</li>
			<li>
				<Link href="/users">Users</Link>
			</li>
			<li>
				<Link href="/settings">Settings</Link>
			</li>
		</ul>
	);
}
