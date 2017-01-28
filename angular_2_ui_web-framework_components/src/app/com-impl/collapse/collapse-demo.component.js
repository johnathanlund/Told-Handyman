"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// webpack html imports
var template = require('./collapse-demo.component.html');
var CollapseDemoComponent = (function () {
    function CollapseDemoComponent() {
        this.isCollapsed = false;
    }
    CollapseDemoComponent.prototype.collapsed = function (event) {
        console.log(event);
    };
    CollapseDemoComponent.prototype.expanded = function (event) {
        console.log(event);
    };
    return CollapseDemoComponent;
}());
CollapseDemoComponent = __decorate([
    core_1.Component({
        selector: 'collapse-demo',
        template: template
    })
], CollapseDemoComponent);
exports.CollapseDemoComponent = CollapseDemoComponent;
//# sourceMappingURL=collapse-demo.component.js.map