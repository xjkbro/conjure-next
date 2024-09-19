"use client";

import { getCookie } from "cookies-next";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

const fallbackData = [];

const Posts = () => {
	// const [posts, setPosts] = useState([]);
	const router = useRouter();
	const columns = useMemo(
		() => [
			{
				header: "ID",
				accessorKey: "id",
			},
			{
				header: "Title",
				accessorKey: "title",
			},
			{
				header: "Description",
				accessorKey: "description",
			},
			// {
			// 	header: "Categories",
			// 	accessorKey: "categories",
			// },
			{
				header: "Created Date",
				accessorKey: "created_at",
			},
			{
				header: "Updated Date",
				accessorKey: "updated_at",
			},
		],
		[]
	);
	const { data: posts, isFetching } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const response = await fetch(`/api/v1/admin/posts`, {
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
	const data = useMemo(() => posts ?? [], [posts]);
	const table = useReactTable({
		columns,
		data, //also good to use a fallback array that is defined outside of the component (stable reference)
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="mt-8 w-11/12 mx-auto">
			<div className="flex justify-end gap-2">
				<Link href="/posts/create" className="btn">
					Create
				</Link>
			</div>
			<div className="flex justify-center mt-8">
				<div className="overflow-x-auto w-full">
					<table className="table">
						{/* head */}
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											className={
												header.column.getCanSort()
													? "cursor-pointer select-none"
													: ""
											}
											key={header.id}
											onClick={header.column.getToggleSortingHandler()}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: " ⇧",
												desc: " ⇩",
											}[header.column.getIsSorted()] ??
												null}
										</th>
									))}
									{/* <th>Actions</th> */}
								</tr>
							))}
						</thead>
						<tbody>
							{!isFetching &&
								table.getRowModel().rows.map((row) => (
									<tr
										className="hover cursor-pointer"
										key={row.id}
										onClick={() => {
											console.log(row);
											router.push(
												"/posts/" + row.original.id
											);
										}}
									>
										{row.getVisibleCells().map((cell) => {
											console.log(cell.getValue());
											switch (
												cell.column.columnDef
													.accessorKey
											) {
												case "description":
													return (
														<td key={cell.id}>
															{cell
																.getValue()
																.substring(
																	0,
																	35
																)}
															...
														</td>
													);
												case "created_at":
												case "updated_at":
													return (
														<td key={cell.id}>
															{new Date(
																cell.getValue()
															).toLocaleString()}
														</td>
													);
												default:
													return (
														<td key={cell.id}>
															{flexRender(
																cell.column
																	.columnDef
																	.cell,
																cell.getContext()
															)}
														</td>
													);
											}
										})}
										{/* <td className="flex gap-1">
											<Link
												href={`/posts/${row.original.id}`}
												className="btn btn-sm"
											>
												View
											</Link>
											<Link
												href={`/posts/${row.original.id}/edit`}
												className="btn btn-sm"
											>
												Edit
											</Link>
											<Link
												href={`/posts/${row.original.id}/delete`}
												className="btn btn-sm"
											>
												Delete
											</Link>
										</td> */}
									</tr>
								))}
						</tbody>
						<tfoot></tfoot>
					</table>
				</div>
			</div>
		</div>
	);
};
export default Posts;
