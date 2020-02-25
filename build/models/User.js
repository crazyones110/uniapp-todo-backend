"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var Memo_1 = require("./Memo");
var Todo_1 = require("./Todo");
var UserSchema = new mongoose_1.Schema({
    openid: {
        type: String,
        required: true
    },
    nickName: String,
    avatarUrl: String,
    memo: [Memo_1.MemoSchema],
    todo: [Todo_1.TodoSchema]
});
exports.User = mongoose_1.default.model('User', UserSchema);
