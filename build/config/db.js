"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = process.env.NODE_ENV; // 环境参数，是在 npm script 里设置的
var REDIS_CONF;
exports.REDIS_CONF = REDIS_CONF;
var MONGO_CONF;
exports.MONGO_CONF = MONGO_CONF;
if (env === 'dev') {
    // redis
    exports.REDIS_CONF = REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    };
    exports.MONGO_CONF = MONGO_CONF = {
        uri: 'mongodb://localhost/mp-todo'
    };
}
if (env === 'production') {
    // redis
    exports.REDIS_CONF = REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    };
    exports.MONGO_CONF = MONGO_CONF = {
        uri: 'mongodb://localhost/mp-todo'
    };
}
