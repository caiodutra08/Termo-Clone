/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
};

module.exports = {
	env: {
		apiDefault: "localhost:8081/api",
	},
};

module.exports = nextConfig;
