import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/', 
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [react(),
    {
      name: 'proxy-fix',
      configureServer(server) {
        server.middlewares.use('/api', (req, res, next) => {
          axios
            .request({
              baseURL: 'http://localhost:3000/', 
              url: req.originalUrl,
              method: req.method,
              headers: req.headers,
              data: req.body,
            })
            .then((response) => {
              res.writeHead(response.status, response.headers);
              res.end(response.data);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).end();
            });
        });
      },
    },
  ],
})
