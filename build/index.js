"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// import cookieSession from 'cookie-session'
require("./controller/LoginController");
require("./controller/RootController");
var AppRouter_1 = require("./AppRouter");
var mongoose_1 = __importDefault(require("mongoose"));
var db_1 = require("./config/db");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
// import './db/mongoose'
var app = express_1.default();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(db_1.MONGO_CONF.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
app.use(morgan_1.default('tiny'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
// app.use(cookieSession({ keys: ['asdqweqwex'] }))
app.use(AppRouter_1.AppRouter.instance);
app.listen(5757, '0.0.0.0', function () {
    console.log('listening on port 5757');
});
