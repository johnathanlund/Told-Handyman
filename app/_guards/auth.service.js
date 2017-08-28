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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_config_1 = require("../app.config");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
var AuthService = (function () {
    function AuthService(http, router, config) {
        this.http = http;
        this.router = router;
        this.config = config;
        this.userSource = new Subject_1.Subject();
        this.user$ = this.userSource.asObservable();
    }
    AuthService.prototype.setUser = function (user) {
        this.userSource.next(user);
    };
    AuthService.prototype.registerUser = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.config.apiUrl + "/api/user/register", body, options).map(function (res) { return _this.setToken(res); });
    };
    AuthService.prototype.loginUser = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.config.apiUrl + "/api/user/login", body, options).map(function (res) { return _this.setToken(res); });
    };
    AuthService.prototype.logout = function () {
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthService.prototype.verify = function () {
        var _this = this;
        var currUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = (currUser && 'token' in currUser) ? currUser.token : this.token;
        var headers = new http_1.Headers({ 'x-access-token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.config.apiUrl + "/api/user/check-state", options).map(function (res) { return _this.parseRes(res); });
    };
    AuthService.prototype.setToken = function (res) {
        var body = JSON.parse(res['_body']);
        if (body['success'] == true) {
            this.token = body['token'];
            localStorage.setItem('currentUser', JSON.stringify({
                email: body['user']['email'],
                name: body['user']['name'],
                token: this.token
            }));
        }
        return body;
    };
    AuthService.prototype.parseRes = function (res) {
        var body = JSON.parse(res['_body']);
        return body;
    };
    AuthService.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/AdminHandyman'], { queryParams: { returnUrl: state.url } });
        console.log('User is not logged in. Routing back to login page.');
        return false;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router, app_config_1.AppConfig])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map