// ...existing code...
module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: __dirname + '/backend',
      script: './dist/app.js',
      watch: false,
      interpreter: '/home/stan99/.local/share/fnm/node-versions/v22.20.0/installation/bin/node',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        FRONTEND_URL: 'http://weblarek.nomorepartiessbs.ru:8080',
        DB_ADDRESS: 'mongodb://localhost:27017/weblarek'
      }
    },
    {
      name: 'frontend',
      cwd: __dirname + '/frontend',
      script: './node_modules/vite/bin/vite.js',
      args: 'preview --port 8080 --host 0.0.0.0',
      watch: false,
      interpreter: '/home/stan99/.local/share/fnm/node-versions/v22.20.0/installation/bin/node',
      env: {
        NODE_ENV: 'production'
      }
    },
  ],
  deploy: {
    production: {
      user: 'stan99',
      host: 'weblarek.nomorepartiessbs.ru',
      ref: 'origin/main',
      repo: 'git@github.com:stan99-cheb/web-larek-express.git',
      path: '/home/stan99/web-larek-express',
      ssh_options: 'ForwardAgent=yes',
      'post-deploy': [
        'cd backend && npm ci && npm run build',
        'cd ../frontend && echo "VITE_API_ORIGIN=http://weblarek.nomorepartiessbs.ru:3000" > .env.production && npm ci && npm run build',
        'cd .. && pm2 reload ecosystem.config.cjs --env production',
        'pm2 save'
      ].join(' && ')
    }
  }
};
