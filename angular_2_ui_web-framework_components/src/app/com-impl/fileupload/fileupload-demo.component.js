"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var FileUploadDemoComponent = (function () {
    function FileUploadDemoComponent() {
        this.hasBaseDropZoneOver = false;
        this.options = {
            url: 'http://localhost/upload/' //the path to your upload folder
        };
    }
    FileUploadDemoComponent.prototype.handleUpload = function (data) {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    };
    FileUploadDemoComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    return FileUploadDemoComponent;
}());
FileUploadDemoComponent = __decorate([
    core_1.Component({
        selector: 'file-upload-demo-app',
        templateUrl: './fileupload-demo.component.html'
    })
], FileUploadDemoComponent);
exports.FileUploadDemoComponent = FileUploadDemoComponent;
//# sourceMappingURL=fileupload-demo.component.js.map