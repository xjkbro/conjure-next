// import { getToken } from "@/auth/auth";
import React from "react";
import Posts from "@/components/Posts";
import { cookies } from "next/headers";
export default async function PostsPage() {
	const cookieStore = cookies();
	const response = await fetch(`${process.env.URL}/api/posts`, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": cookieStore.get("XSRF-TOKEN").value,
		},
		credentials: "include",
	});
	const data = await response.json();

	return <Posts />;
}
