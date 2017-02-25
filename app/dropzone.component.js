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
var DropzoneComponent = (function () {
    function DropzoneComponent() {
        var _this = this;
        System.import('../dropzone.js').then(function (dz) { return _this.initDropzone(dz); });
    }
    DropzoneComponent.prototype.initDropzone = function (d) {
        this._dropzone = new d('div#myId', { url: 'http://localhost:8000/upload' });
    };
    return DropzoneComponent;
}());
DropzoneComponent = __decorate([
    core_1.Component({
        selector: 'dropzone',
        template: "\n    <div id=\"myId\">Drop down area</div>\n    "
    }),
    __metadata("design:paramtypes", [])
], DropzoneComponent);
exports.DropzoneComponent = DropzoneComponent;
//# sourceMappingURL=dropzone.component.js.map