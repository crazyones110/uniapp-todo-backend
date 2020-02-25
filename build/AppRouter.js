"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AppRouter = /** @class */ (function () {
    function AppRouter() {
    }
    Object.defineProperty(AppRouter, "instance", {
        get: function () {
            if (!AppRouter.Instance) {
                AppRouter.Instance = express_1.default.Router();
            }
            return AppRouter.Instance;
        },
        enumerable: true,
        configurable: true
    });
    return AppRouter;
}());
exports.AppRouter = AppRouter;
