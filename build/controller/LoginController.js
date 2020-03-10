"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var redis_1 = require("../db/redis");
var axios_1 = __importDefault(require("axios"));
var User_1 = require("../models/User");
var SuccessModel_1 = require("../models/SuccessModel");
function checkWechatLogin(req, res) {
    var _this = this;
    var code = req.params.code;
    var appId = 'wxb5cde3ee4ee45929';
    var appSecret = 'ede8f9ff4b7f0816314bfb8c5c5da1d8';
    axios_1.default
        .get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
            appid: appId,
            secret: appSecret,
            js_code: code,
            grant_type: 'authorization_code'
        }
    })
        .then(function (_a) {
        var data = _a.data;
        return __awaiter(_this, void 0, void 0, function () {
            var session_key, openid, _b, nickName, avatarUrl, checkLoginResult, userId, insertLoginResult, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        session_key = data.session_key, openid = data.openid;
                        _b = req.body, nickName = _b.nickName, avatarUrl = _b.avatarUrl;
                        return [4 /*yield*/, User_1.User.findOne({ openid: openid })];
                    case 1:
                        checkLoginResult = _c.sent();
                        console.log('checkLoginResult', checkLoginResult);
                        userId = Date.now() + "_" + Math.random();
                        redis_1.set(userId, openid, 60 * 60 * 60 * 24 * 2); // 2天 过期
                        if (!!checkLoginResult) return [3 /*break*/, 6];
                        insertLoginResult = void 0;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, User_1.User.create({
                                openid: openid,
                                nickName: nickName,
                                avatarUrl: avatarUrl
                            })];
                    case 3:
                        insertLoginResult = _c.sent();
                        console.log('用户第一次登录，把数据存入 mongo');
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _c.sent();
                        console.log(e_1);
                        res.status(500).send('登录失败');
                        return [2 /*return*/];
                    case 5:
                        res
                            .header('Set-Cookie', "userId=" + userId)
                            .status(200)
                            .send(new SuccessModel_1.SuccessModel('登陆成功', {
                            memoCount: insertLoginResult.memo.length,
                            todoCount: insertLoginResult.todo.length,
                            restTodoCount: insertLoginResult.todo.filter(function (item) { return item.checked === false; }).length
                        }));
                        return [2 /*return*/];
                    case 6:
                        res
                            .header('Set-Cookie', "userId=" + userId)
                            .status(200)
                            .send(new SuccessModel_1.SuccessModel('登陆成功', {
                            memoCount: checkLoginResult.memo.length,
                            todoCount: checkLoginResult.todo.length,
                            restTodoCount: checkLoginResult.todo.filter(function (item) { return item.checked === false; }).length
                        }));
                        return [2 /*return*/];
                }
            });
        });
    });
}
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.launchCheck = function (req, res) {
        var userId = req.cookies.userId;
        redis_1.get(userId).then(function (openid) {
            if (openid) {
                // redis 中存了的情况
                console.log('这次登录成功是使用了 redis');
                var userId_1 = Date.now() + "_" + Math.random();
                redis_1.set(userId_1, openid, 60 * 60 * 60 * 24 * 2); // 2天 过期
                res
                    .header('Set-Cookie', "userId=" + userId_1)
                    .status(200)
                    .send('登录成功');
                return;
            }
            // redis 中没有，说明到期了
            console.log('redis 到期了，这次应该换userid');
            res.status(200).send('已过期');
        });
    };
    LoginController.prototype.postLogin = function (req, res) {
        var userId = req.cookies.userId;
        if (!userId) {
            // 用户第一次授权微信登录
            // this.checkWechatLogin(req, res)
            checkWechatLogin(req, res);
            return;
        }
        redis_1.get(userId).then(function (openid) {
            if (openid) {
                // redis 中存了的情况
                console.log('这次登录成功是使用了 redis');
                var userId_2 = Date.now() + "_" + Math.random();
                redis_1.set(userId_2, openid, 60 * 60 * 60 * 24 * 2); // 2天 过期
                res
                    .header('Set-Cookie', "userId=" + userId_2)
                    .status(200)
                    .send('登录成功');
                return;
            }
            // redis 中没有，说明到期了
            console.log('redis 到期了，这次应该换userid');
            // this.checkWechatLogin(req, res)
            checkWechatLogin(req, res);
        });
    };
    LoginController.prototype.updateUserInfo = function (req, res) {
        var _this = this;
        var userId = req.cookies.userId;
        if (!userId) {
            res.status(500).send(new SuccessModel_1.SuccessModel('没有userId'));
            return;
        }
        redis_1.get(userId).then(function (openid) { return __awaiter(_this, void 0, void 0, function () {
            var _a, nickName, avatarUrl, updatedUser;
            return __generator(this, function (_b) {
                if (openid) {
                    _a = req.body, nickName = _a.nickName, avatarUrl = _a.avatarUrl;
                    updatedUser = User_1.User.findOneAndUpdate({ openid: openid }, { nickName: nickName, avatarUrl: avatarUrl }, { new: true });
                    updatedUser.findOne({ openid: openid }, function (err, user) {
                        if (err) {
                            res.status(500).send(new SuccessModel_1.SuccessModel('mongodb更新失败'));
                            return;
                        }
                        res
                            .status(200)
                            .send(new SuccessModel_1.SuccessModel('用户信息更新成功', {
                            memoCount: user === null || user === void 0 ? void 0 : user.memo.length,
                            todoCount: user === null || user === void 0 ? void 0 : user.todo.length,
                            restTodoCount: user === null || user === void 0 ? void 0 : user.todo.filter(function (item) { return item.checked === false; }).length
                        }));
                    });
                    return [2 /*return*/];
                }
                // redis 中没有，说明到期了
                console.log('redis 到期了，这次应该换userid');
                res.status(500).send(new SuccessModel_1.SuccessModel('redis到期了'));
                return [2 /*return*/];
            });
        }); });
    };
    __decorate([
        decorators_1.get('/launchCheck'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "launchCheck", null);
    __decorate([
        decorators_1.post('/wxlogin/:code'),
        decorators_1.bodyValidator('avatarUrl', 'nickName'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        decorators_1.post('/updateUserInfo'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "updateUserInfo", null);
    LoginController = __decorate([
        decorators_1.controller('/auth')
    ], LoginController);
    return LoginController;
}());
