module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: '/home/stan99/web-larek-express/current/backend',
      script: './dist/app.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        FRONTEND_URL: 'http://weblarek.nomorepartiessbs.ru:8080',
        DB_ADDRESS: 'mongodb://localhost:27017/weblarek'
      }
    },
    {
      name: 'frontend',
      cwd: '/home/stan99/web-larek-express/current/frontend',
      script: './node_modules/vite/bin/vite.js',
      args: 'preview --port 8080 --host 0.0.0.0',
      watch: false,
      env: {
        NODE_ENV: 'production',
      }
    },
  ],

  deploy: {
    production: {
      user: 'stan99',
      host: 'weblarek.nomorepartiessbs.ru',
      ref: 'origin/main',
      repo: 'https://github.com/stan99-cheb/web-larek-express.git',
      path: '/home/stan99/web-larek-express',
      'pre-deploy-local': 'scp frontend/.env stan99@weblarek.nomorepartiessbs.ru:/home/stan99/web-larek-express/current/frontend/.env',
      'post-deploy': 'cd backend && npm install && npm run build && cd ../frontend && npm install && npm run build && cd .. && pm2 reload ecosystem.config.cjs --env production && pm2 save',
      'pre-setup': ''
    }
  }
};