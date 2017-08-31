var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_guards/auth.service';
var LoginComponent = (function () {
    function LoginComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.user = new User;
    }
    LoginComponent.prototype.loginUser = function (user) {
        var _this = this;
        this.authService.loginUser(user).subscribe(function (res) {
            _this.user_status = res['success'];
            if (res['success'] == true) {
                _this.authService.setUser(res['user']);
                _this.router.navigate(['login/AdminHandyman']);
            }
            else {
                _this.message = res['message'];
            }
        });
    };
    LoginComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'app-login',
            templateUrl: './login.component.html',
        }),
        __metadata("design:paramtypes", [Router, AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map