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
var data_service_1 = require("./services/data.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var LoginComponent = (function () {
    function LoginComponent(dataService, formBuilder, router) {
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.loginEmail = new forms_1.FormControl('', forms_1.Validators.required);
        this.loginPassword = new forms_1.FormControl('', forms_1.Validators.required);
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginUserForm = this.formBuilder.group({
            loginEmail: this.loginEmail,
            loginPassword: this.loginPassword
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.dataService.login(this.loginUserForm.value).subscribe(function (res) {
            var newLoginUser = res.json();
            console.log('Login successfull at AdminHandymanComponent');
            _this.router.navigate(['/RealAdminHandyman']);
            console.log('Past the login.router in AdminHandymanComponent.');
            _this.loginUserForm.reset();
        }, function (error) { return console.log('Login error at AdminHandymanComponent'); });
        // DataService.login($scope.credentials).then(function(response) {
        // $state.go('profile');
        // });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-login',
        templateUrl: "login.component.html",
        styleUrls: ['./styles/login.component.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService,
        forms_1.FormBuilder,
        router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map