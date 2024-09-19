"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getToken } from "@/auth/auth";
import { getCookie } from "cookies-next";

export default function SinglePost({ params }) {
	const { id } = params;
	const router = useRouter();
	const [post, setPost] = useState({});
	const [edited, setEdited] = useState(false);
	const { data, isFetching } = useQuery({
		queryKey: [`singlePost-${id}`],
		queryFn: async () => {
			const response = await fetch(`/api/v1/admin/posts/${id}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setPost(data);
			return data;
		},
	});

	const updatePost = (e, value) => {
		setPost({ ...post, [value]: e.target.value });
		setEdited(true);
	};

	const savePost = async () => {
		console.log(post);
		await getToken();
		await fetch(`/api/v1/admin/posts/${id}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
			},
			body: JSON.stringify(post),
		});
		setEdited(false);
		router.refresh();
	};

	return (
		<div className="mt-8 w-11/12 mx-auto">
			<div className="flex justify-end gap-2">
				<div
					className="btn"
					onClick={() =>
						edited
							? confirm(
									"You have unsaved changes. Do you want to leave?"
							  ) && router.back()
							: router.back()
					}
				>
					Back
				</div>
				<div
					className={`btn ${edited ? "btn-primary" : "btn-disabled"}`}
					onClick={edited ? savePost : null}
				>
					Edit
				</div>
			</div>
			<div className="flex justify-center mt-8">
				{!isFetching && (
					<div className="w-11/12 grid grid-cols-4 gap-3">
						<label className="form-control w-full col-span-2">
							<div className="label label-text">Title</div>
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full"
								value={post.title}
								onChange={(e) => updatePost(e, "title")}
							/>
						</label>
						<label className="form-control w-full col-span-2">
							<div className="label label-text">Slug</div>
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full"
								value={post.slug}
								onChange={(e) => updatePost(e, "slug")}
							/>
						</label>
						<label className="form-control w-full col-span-4">
							<div className="label label-text">Description</div>
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full"
								value={post.description}
								onChange={(e) => updatePost(e, "description")}
							/>
						</label>
						<label className="form-control col-span-4">
							<div className="label label-text">Content</div>
							<textarea
								className="textarea textarea-bordered h-96 resize-none"
								placeholder="Bio"
								value={post.content}
								onChange={(e) => updatePost(e, "content")}
							></textarea>
						</label>
					</div>
				)}
			</div>
		</div>
	);
}
