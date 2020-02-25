"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Category;
(function (Category) {
    Category["personal"] = "personal";
    Category["life"] = "life";
    Category["work"] = "work";
})(Category || (Category = {}));
exports.MemoSchema = new mongoose_1.Schema({
    createTime: {
        type: Number,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    category: ['personal', 'life', 'work']
});
