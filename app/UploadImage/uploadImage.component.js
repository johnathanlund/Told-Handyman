"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import component and the oninit method from angular core
var core_1 = require("@angular/core");
//import the file uploader plugin
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
//define the constant url we would be uploading to.
var URL = 'http://localhost:8000/upload';
//create the component properties
var UploadImageComponent = (function () {
    function UploadImageComponent() {
        //declare a property called fileuploader and assign it to an instance of a new fileUploader.
        //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL, itemAlias: 'photo' });
        //This is the default title property created by the angular cli. Its responsible for the app works
        this.title = 'UploadImageComponent works!';
    }
    UploadImageComponent.prototype.ngOnInit = function () {
        var _this = this;
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
            console.log('In .onAfterAddingFile, jsonof file is:  ' + file.file.name);
            console.log('Json of file.file is: ' + JSON.stringify(file.file));
        };
        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload:uploaded:", item, " Thats the item. ", status, " Thats the status. ", response, " THats the response.", item.file.name);
            _this.uploader.queue.length = 0;
            console.log('What is in the uploader.queue is: ' + _this.uploader.queue.length);
        };
    };
    // fileEvent(fileInput: any) {
    //   let file = fileInput.target.files[0];
    //   let fileName = file.name;
    //   console.log('FileName function has been reached. FileName is: ' + fileName);
    // };
    UploadImageComponent.prototype.cancelUploaderItem = function (item) {
        for (var i = 0; i < this.uploader.queue.length; i++) {
            var itm = this.uploader.queue[i];
            if (itm = item) {
                itm.remove();
            }
        }
        console.log('File has been cleared from the uploader.queue');
    };
    ;
    UploadImageComponent.prototype.cancelUploaderAll = function () {
        this.uploader.clearQueue();
        console.log("Uploader.queue has been cleared.");
    };
    return UploadImageComponent;
}());
UploadImageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        //define the element to be selected from the html structure.
        selector: 'upload-image',
        //location of our template rather than writing in-line templates.
        templateUrl: './uploadImage.component.html',
        styleUrls: ['../styles/uploadImage.component.css']
    })
], UploadImageComponent);
exports.UploadImageComponent = UploadImageComponent;
//# sourceMappingURL=uploadImage.component.js.map