"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
var db_1 = require("../config/db");
// 创建客户端
var redisClient = redis_1.default.createClient(db_1.REDIS_CONF.port, db_1.REDIS_CONF.host);
redisClient.on("error", function (err) {
    console.error(err);
});
/**
 * 多少秒过期
 */
exports.set = function (key, val, expireTime) {
    // if (val instanceof Object) {
    //   val = JSON.stringify(val)
    // }
    if (typeof val === "object") {
        val = JSON.stringify(val);
    }
    if (!expireTime) {
        redisClient.set(key, val);
    }
    else {
        redisClient.set(key, val, 'EX', expireTime);
    }
};
exports.get = function (key) {
    return new Promise(function (resolve, reject) {
        redisClient.get(key, function (err, val) {
            if (err) {
                reject(err);
                return;
            }
            if (val === null) { // 瞎传了一个 key，值可能是 null
                resolve(null);
                return;
            }
            try { // 兼容 JSON 转换的这种格式，很巧妙！
                resolve(JSON.parse(val));
            }
            catch (ex) {
                resolve(val);
            }
        });
    });
};
// module.exports = {
//   set,
//   get
// }
