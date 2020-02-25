"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var db_1 = require("../config/db");
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(db_1.MONGO_CONF.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
