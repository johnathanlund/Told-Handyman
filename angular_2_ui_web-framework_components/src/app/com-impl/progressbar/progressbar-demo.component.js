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
var core_1 = require("@angular/core");
//import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../../com/ng2-bootstrap-config';
// switch bs3\bs4 templates
// webpack html imports
var templates = (_a = {},
    _a[1] = require('./progressbar-demo.component.html'),
    _a);
var ProgressbarDemoComponent = (function () {
    function ProgressbarDemoComponent() {
        this.max = 200;
        this.stacked = [];
        this.random();
        this.randomStacked();
    }
    ProgressbarDemoComponent.prototype.random = function () {
        var value = Math.floor((Math.random() * 100) + 1);
        var type;
        if (value < 25) {
            type = 'success';
        }
        else if (value < 50) {
            type = 'info';
        }
        else if (value < 75) {
            type = 'warning';
        }
        else {
            type = 'danger';
        }
        this.showWarning = (type === 'danger' || type === 'warning');
        this.dynamic = value;
        this.type = type;
    };
    ;
    ProgressbarDemoComponent.prototype.randomStacked = function () {
        var types = ['success', 'info', 'warning', 'danger'];
        this.stacked = [];
        var total = 0;
        var n = Math.floor((Math.random() * 4) + 1);
        for (var i = 0; i < n; i++) {
            var index = Math.floor((Math.random() * 4));
            var value = Math.floor((Math.random() * 30) + 1);
            total += value;
            this.stacked.push({
                value: value,
                max: value,
                type: types[index]
            });
        }
    };
    ;
    return ProgressbarDemoComponent;
}());
ProgressbarDemoComponent = __decorate([
    core_1.Component({
        selector: 'progressbar-demo',
        template: templates[1]
    }),
    __metadata("design:paramtypes", [])
], ProgressbarDemoComponent);
exports.ProgressbarDemoComponent = ProgressbarDemoComponent;
var _a;
//# sourceMappingURL=progressbar-demo.component.js.map