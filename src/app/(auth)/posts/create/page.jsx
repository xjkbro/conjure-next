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
		content: "",
	});
	const router = useRouter();
	const mutation = useMutation({
		mutationFn: async () => {
			await getToken();
			const response = await fetch("/api/posts", {
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
		onSuccess: () => {
			// Invalidate and refetch
		},
	});
	return (
		<div className="flex mt-12 justify-center items-center">
			<form className="flex flex-col gap-2 max-w-xs">
				<input
					className="input input-bordered w-full max-w-xs"
					type="text"
					placeholder="Title"
					value={formData.title}
					onChange={(e) =>
						setFormData({ ...formData, title: e.target.value })
					}
				/>
				<textarea
					placeholder="Content"
					value={formData.content}
					className="textarea textarea-bordered w-full max-w-xs"
					onChange={(e) =>
						setFormData({ ...formData, content: e.target.value })
					}
				/>

				<button
					className="btn"
					onClick={(e) => {
						e.preventDefault();
						mutation.mutate(formData);
						queryClient.invalidateQueries({ queryKey: ["posts"] });
						router.push("/posts");
					}}
				>
					Submit
				</button>
			</form>
		</div>
	);
}
