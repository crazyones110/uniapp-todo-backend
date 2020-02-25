const env = process.env.NODE_ENV as 'dev' | 'production' // 环境参数，是在 npm script 里设置的
let REDIS_CONF: {port: number, host: string}
let MONGO_CONF: {uri: string}
if (env === 'dev') {
  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
  MONGO_CONF = {
    uri: 'mongodb://localhost/mp-todo'
  }
}

if (env === 'production') {
  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
  MONGO_CONF = {
    uri: 'mongodb://localhost/mp-todo'
  }
}

// module.exports = {
//   REDIS_CONF,
//   MONGO_CONF
// }
export {REDIS_CONF, MONGO_CONF}