/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:8000/api/:path*",
			},
			{
				source: "/auth/cookie",
				destination: "http://localhost:8000/sanctum/csrf-cookie",
			},
			{
				source: "/auth/login",
				destination: "http://localhost:8000/login",
			},
			{
				source: "/auth/logout",
				destination: "http://localhost:8000/logout",
			},
		];
	},
};

export default nextConfig;
