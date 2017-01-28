"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// webpack html imports
var template = require('./dropdown-demo.component.html');
var DropdownDemoComponent = (function () {
    function DropdownDemoComponent() {
        this.disabled = false;
        this.status = { isopen: false };
        this.items = ['The first choice!',
            'And another choice for you.', 'but wait! A third!'];
    }
    DropdownDemoComponent.prototype.toggled = function (open) {
        console.log('Dropdown is now: ', open);
    };
    DropdownDemoComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    return DropdownDemoComponent;
}());
DropdownDemoComponent = __decorate([
    core_1.Component({
        selector: 'dropdown-demo',
        template: template
    })
], DropdownDemoComponent);
exports.DropdownDemoComponent = DropdownDemoComponent;
//# sourceMappingURL=dropdown-demo.component.js.map