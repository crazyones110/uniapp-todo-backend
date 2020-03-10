"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Category;
(function (Category) {
    Category["personal"] = "personal";
    Category["life"] = "life";
    Category["work"] = "work";
})(Category || (Category = {}));
exports.TodoSchema = new mongoose_1.Schema({
    content: {
        type: String
    },
    category: String,
    createTime: {
        type: Number,
        required: true
    },
    checked: Boolean,
    deleted: Boolean
});
