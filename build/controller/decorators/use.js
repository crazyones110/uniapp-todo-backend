"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
// export function use(middleware: RequestHandler) {
//   return function(target: any, key: string, desc: PropertyDescriptor) {
//     const middlewares =
//       Reflect.getMetadata(MetadataKeys.middleware, target, key) || []
//     middlewares.push(middleware)
//     Reflect.defineMetadata(
//       MetadataKeys.middleware,
//       [...middlewares, middleware],
//       target,
//       key
//     )
//   }
// }
function use(middleware) {
    return function (target, key, desc) {
        var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.middleware, __spreadArrays(middlewares, [middleware]), target, key);
    };
}
exports.use = use;
