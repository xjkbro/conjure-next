"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Posts = () => {
	// const [posts, setPosts] = useState([]);
	const router = useRouter();
	const { data, isFetching } = useQuery({
		queryKey: "posts",
		queryFn: async () => {
			const response = await fetch(`/api/posts`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
				},
			});
			const data = await response.json();
			return data;
		},
	});
	// useEffect(() => {
	// 	const getPosts = async () => {
	// 		await fetch(`/auth/cookie`, {
	// 			method: "GET",
	// 		});
	// 		const response = await fetch(`/api/posts`, {
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 				"X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
	// 			},
	// 		});
	// 		const data = await response.json();
	// 		setPosts(data);
	// 	};
	// 	getPosts();
	// }, []);
	return (
		<>
			<Link href="/posts/create">Create</Link>
			<div className="flex justify-center mt-8">
				{/* <div className="bg-white w-2/3 shadow-md rounded-xl p-4">
					{!isFetching &&
						data.map((p) => (
							<Link href={`/posts/${p.id}`} key={p.id}></Link>
						))}
				</div> */}
				<div className="overflow-x-auto w-5/6">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th></th>
								<th>Title</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{!isFetching &&
								data.map((p) => (
									<tr
										className="cursor-pointer"
										onClick={() =>
											router.push(`/posts/${p.id}`)
										}
										key={p.id}
									>
										<th>{p.id}</th>
										<td>{p.title}</td>
										<td>{p.content.substring(0, 30)}...</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
export default Posts;
