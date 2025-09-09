module.exports = {
	apps: [
		{
			name: "maneno-frontend",
			script: "npm",
			args: "run preview",
			cwd: "/apps/maneno/client",
			interpreter: "none",
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: "1G",
			env: {
				NODE_ENV: "production",
				PORT: 8090,
				VITE_API_URL: "https://maneno.me/api",
			},
			env_development: {
				NODE_ENV: "development",
				PORT: 5173,
				VITE_API_URL: "http://localhost:8000", // For local dev
			},
			// env_file: "/apps/maneno/client/.env", // Load .env if present
		},
	],
};
