"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.checkExist = function (openid) {
        return new Promise(function (resolve, reject) {
            User_1.User.find({ openid: openid }).then(function (users) {
                if (users.length === 0) {
                    resolve('none');
                    return;
                }
                if (users.length) {
                    resolve('exist');
                }
            });
        });
    };
    return UserController;
}());
