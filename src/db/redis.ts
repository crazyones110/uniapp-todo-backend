import redis from "redis"
import { REDIS_CONF } from '../config/db'

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on("error", err => {
  console.error(err)
})

/**
 * 多少秒过期
 */
export const set = (key: string, val: any, expireTime: number): void => {
  // if (val instanceof Object) {
  //   val = JSON.stringify(val)
  // }
  if (typeof val === "object") {
    val = JSON.stringify(val)
  }
  if (!expireTime) {
    redisClient.set(key, val)
  } else {
    redisClient.set(key, val, 'EX', expireTime)
  }
}

export const get = (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) { // 瞎传了一个 key，值可能是 null
        resolve(null)
        return
      }

      try { // 兼容 JSON 转换的这种格式，很巧妙！
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

// module.exports = {
//   set,
//   get
// }