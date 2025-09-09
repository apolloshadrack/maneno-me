import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		plugins: [react()],
		publicDir: "public",
		optimizeDeps: {
			exclude: ["lucide-react"],
		},
		server: {
			host: "::",
			// port: 8047,
			proxy: {
				"/api": {
					target: "http://localhost:8000",
					changeOrigin: true,
					secure: false,
				},
			},
		},
		preview: {
			port: 80, // Ensure this matches your desired port
			host: "0.0.0.0", // Allow external access (needed for domain access)
			allowedHosts: ["maneno.me", "www.maneno.me"], // Add your domain here
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
