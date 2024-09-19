"use client";
import { queryClient } from "@/app/providers";
import { getToken } from "@/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreatePost() {
	const [formData, setFormData] = useState({
		title: "",
		slug: "",
		description: "",
		content: "",
	});
	const router = useRouter();
	const mutation = useMutation({
		mutationFn: async () => {
			await getToken();
			const response = await fetch("/api/v1/admin/posts", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			return data;
		},
		onSuccess: (data) => {
			// Invalidate and refetch
			router.push("/posts/" + data.id);
		},
	});
	return (
		<div className="mt-8 w-11/12 mx-auto">
			<div className="flex justify-end gap-2">
				<div
					className="btn btn-primary"
					onClick={(e) => {
						e.preventDefault();
						mutation.mutate(formData);
						queryClient.invalidateQueries({ queryKey: ["posts"] });
						console.log(mutation);
					}}
				>
					Save
				</div>
			</div>
			<div className="flex justify-center mt-8">
				<div className="w-11/12 grid grid-cols-4 gap-3">
					<label className="form-control w-full col-span-2">
						<div className="label label-text">Title</div>
						<input
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full"
							value={formData.title}
							onChange={(e) =>
								setFormData({
									...formData,
									title: e.target.value,
								})
							}
						/>
					</label>
					<label className="form-control w-full col-span-2">
						<div className="label label-text">Slug</div>
						<input
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full"
							value={formData.slug}
							onChange={(e) =>
								setFormData({
									...formData,
									slug: e.target.value,
								})
							}
						/>
					</label>
					<label className="form-control w-full col-span-4">
						<div className="label label-text">Description</div>
						<input
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full"
							value={formData.description}
							onChange={(e) =>
								setFormData({
									...formData,
									description: e.target.value,
								})
							}
						/>
					</label>
					<label className="form-control col-span-4">
						<div className="label label-text">Content</div>
						<textarea
							className="textarea textarea-bordered h-96 resize-none"
							placeholder="Bio"
							value={formData.content}
							onChange={(e) =>
								setFormData({
									...formData,
									content: e.target.value,
								})
							}
						></textarea>
					</label>
				</div>
			</div>
		</div>
	);
}
