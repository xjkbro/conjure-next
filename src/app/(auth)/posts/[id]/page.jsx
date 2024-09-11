"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SinglePost({ params }) {
	const { id } = params;
	const router = useRouter();
	const { data, isFetching } = useQuery({
		queryKey: `singlePost-${id}`,
		queryFn: async () => {
			const response = await fetch(`/api/post/${id}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			return data;
		},
	});
	return (
		<div>
			<div onClick={() => router.back()}>Back</div>
			{!isFetching && (
				<div>
					<h1>{data.title}</h1>
					<p>{data.content}</p>
				</div>
			)}
		</div>
	);
}
