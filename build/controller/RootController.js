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
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var redis_1 = require("../db/redis");
var User_1 = require("../models/User");
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, openid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.cookies.userId;
                    if (userId === undefined) {
                        res.status(403).send('No Cookies');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, redis_1.get(userId)];
                case 1:
                    openid = _a.sent();
                    if (openid !== null) {
                        req.openid = openid;
                        next();
                        return [2 /*return*/];
                    }
                    res.status(403).send('Authentication Expires');
                    return [2 /*return*/];
            }
        });
    });
}
var TodoController = /** @class */ (function () {
    function TodoController() {
    }
    TodoController.prototype.getTodos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({ openid: req.openid })];
                    case 1:
                        user = _a.sent();
                        res.status(200).send(user === null || user === void 0 ? void 0 : user.todo);
                        return [2 /*return*/];
                }
            });
        });
    };
    TodoController.prototype.addTodo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newTodo;
            return __generator(this, function (_a) {
                newTodo = req.body;
                console.log('req.openid', req.openid);
                User_1.User.findOneAndUpdate({
                    openid: req.openid
                }, {
                    $push: {
                        todo: newTodo
                    }
                }, { upsert: true }, function (err, result) {
                    if (err) {
                        res.status(500).send('Insert Error');
                        return;
                    }
                    res.status(200).send('Insert Success');
                });
                return [2 /*return*/];
            });
        });
    };
    TodoController.prototype.updateTodo = function (req, res) {
        User_1.User.findOneAndUpdate({
            openid: req.openid,
            'todo.createTime': req.body.createTime
        }, {
            $set: {
                'todo.$': req.body
            }
        }, function (err, value) {
            if (err) {
                res.status(500).send('Update Error');
                return;
            }
            res.status(200).send('Update Success');
        });
    };
    TodoController.prototype.deleteTodo = function (req, res) {
        User_1.User.findOneAndUpdate({
            openid: req.openid
        }, {
            $pull: {
                todo: {
                    createTime: req.body.createTime
                }
            }
        }, function (err, result) {
            if (err) {
                res.status(500).send('Delete Error');
                return;
            }
            res.status(200).send('Delete Success');
        });
    };
    __decorate([
        decorators_1.get('/todo'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], TodoController.prototype, "getTodos", null);
    __decorate([
        decorators_1.post('/todo'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], TodoController.prototype, "addTodo", null);
    __decorate([
        decorators_1.put('/todo'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TodoController.prototype, "updateTodo", null);
    __decorate([
        decorators_1.del('/todo'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TodoController.prototype, "deleteTodo", null);
    TodoController = __decorate([
        decorators_1.controller('')
    ], TodoController);
    return TodoController;
}());
var MemoController = /** @class */ (function () {
    function MemoController() {
    }
    MemoController.prototype.getMemos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({ openid: req.openid })];
                    case 1:
                        user = _a.sent();
                        res.status(200).send(user === null || user === void 0 ? void 0 : user.memo);
                        return [2 /*return*/];
                }
            });
        });
    };
    MemoController.prototype.addMemo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newMemo;
            return __generator(this, function (_a) {
                newMemo = req.body;
                console.log('req.openid', req.openid);
                User_1.User.findOneAndUpdate({
                    openid: req.openid
                }, {
                    $push: {
                        memo: newMemo
                    }
                }, { upsert: true }, function (err, result) {
                    if (err) {
                        res.status(500).send('Insert Error');
                        return;
                    }
                    res.status(200).send('插入成功');
                });
                return [2 /*return*/];
            });
        });
    };
    MemoController.prototype.updateMemo = function (req, res) {
        User_1.User.findOneAndUpdate({
            openid: req.openid,
            'memo.createTime': req.body.createTime
        }, {
            $set: {
                'memo.$': req.body
            }
        }, function (err, value) {
            if (err) {
                res.status(500).send('Update Error');
                return;
            }
            res.status(200).send('Update Success');
        });
    };
    MemoController.prototype.deleteTodo = function (req, res) {
        User_1.User.findOneAndUpdate({
            openid: req.openid
        }, {
            $pull: {
                memo: {
                    createTime: req.body.createTime
                }
            }
        }, function (err, result) {
            if (err) {
                res.status(500).send('Delete Error');
                return;
            }
            res.status(200).send('Delete Success');
        });
    };
    __decorate([
        decorators_1.get('/memo'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], MemoController.prototype, "getMemos", null);
    __decorate([
        decorators_1.post('/memo'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], MemoController.prototype, "addMemo", null);
    __decorate([
        decorators_1.put('/memo'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MemoController.prototype, "updateMemo", null);
    __decorate([
        decorators_1.del('/memo'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MemoController.prototype, "deleteTodo", null);
    MemoController = __decorate([
        decorators_1.controller('')
    ], MemoController);
    return MemoController;
}());
