"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var told_handyman_component_1 = require("./told-handyman/told-handyman.component");
var admin_handyman_component_1 = require("./admin-handyman/admin-handyman.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var auth_service_1 = require("./_guards/auth.service");
var routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: told_handyman_component_1.ToldHandymanComponent },
    { path: 'AdminHandyman', component: login_component_1.LoginComponent },
    { path: 'Register', component: register_component_1.RegisterComponent },
    { path: 'login/AdminHandyman', component: admin_handyman_component_1.AdminHandymanComponent, canActivate: [auth_service_1.AuthService] },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map