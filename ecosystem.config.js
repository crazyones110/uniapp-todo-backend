module.exports = {
  apps : [{
    name: "mp-todo",
    script: "./build/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    combine_logs: true
  }]
}