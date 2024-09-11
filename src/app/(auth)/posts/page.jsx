// import { getToken } from "@/auth/auth";
import React from "react";
import Posts from "@/components/Posts";
import { cookies } from "next/headers";
export default async function PostsPage() {
	const cookieStore = cookies();
	// await fetch(`${process.env.URL}/auth/cookie`, {}).then((response) => {
	// 	console.log(response);
	// 	//set cookies
	// 	// console.log(response.headers.get("set-cookie"));
	// });
	// console.log(cookieStore.get("XSRF-TOKEN").value);
	const response = await fetch(`${process.env.URL}/api/posts`, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": cookieStore.get("XSRF-TOKEN").value,
			// Referer: "127.0.0.1:8000",
		},
		credentials: "include",
	});
	const data = await response.json();
	console.log(response);

	return (
		<div>
			<Posts />
		</div>
	);
}
