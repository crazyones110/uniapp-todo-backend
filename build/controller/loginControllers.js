"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.getLogin = function (req, res) {
        res.send("\n      <form method=\"POST\">\n        <div>\n          <label>\n            Email:<input name=\"email\">\n          </label>\n        </div>\n        <div>\n          <label>\n            password:<input name=\"password\" type=\"password\">\n          </label>\n        </div>\n        <button>Submit</button>\n      </form>\n    ");
    };
    __decorate([
        getComputedStyle('/login')
    ], LoginController.prototype, "getLogin", null);
    LoginController = __decorate([
        controller('/')
    ], LoginController);
    return LoginController;
}());
