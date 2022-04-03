module.exports = {
  apps : [{
    name: 'example',
    script: 'npx',
    interpreter: 'none',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'serve build -s -l 3000',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]

};
