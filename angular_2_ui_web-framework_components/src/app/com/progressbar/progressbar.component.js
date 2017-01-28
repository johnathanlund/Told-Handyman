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
var ProgressbarComponent = (function () {
    function ProgressbarComponent() {
    }
    return ProgressbarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ProgressbarComponent.prototype, "animate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ProgressbarComponent.prototype, "max", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ProgressbarComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ProgressbarComponent.prototype, "value", void 0);
ProgressbarComponent = __decorate([
    core_1.Component({
        selector: 'progressbar',
        template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  "
    })
], ProgressbarComponent);
exports.ProgressbarComponent = ProgressbarComponent;
//# sourceMappingURL=progressbar.component.js.map