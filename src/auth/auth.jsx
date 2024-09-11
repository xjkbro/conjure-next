export const getToken = async () => {
	await fetch("/auth/cookie", {
		method: "GET",
		// credentials: "include",
	}).then((response) => {
		console.log(response);
	});
};
