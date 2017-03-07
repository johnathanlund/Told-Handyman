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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var data_service_1 = require("./services/data.service");
// import { FileUploadComponent }  from './fileUpload.component';
// import { UploadService }  from './services/upload.service';
// import { DropzoneModule }         from 'angular2-dropzone-wrapper';
// import { DropzoneComponent }  from './dropzone.component';
var AdminHandymanComponent = (function () {
    function AdminHandymanComponent(http, dataService, router, sanitizer, renderer, formBuilder) {
        this.http = http;
        this.dataService = dataService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.formBuilder = formBuilder;
        this.services = [];
        this.isLoading = true;
        this.service = {};
        this.isEditing = false;
        this.serviceName = new forms_1.FormControl('', forms_1.Validators.required);
        this.serviceDescription = new forms_1.FormControl('', forms_1.Validators.required);
        this.serviceLists = [];
        this.serviceListIsLoading = true;
        this.serviceList = {};
        this.serviceListIsEditing = false;
        this.serviceListName = new forms_1.FormControl('', forms_1.Validators.required);
        this.serviceListDescription = new forms_1.FormControl('', forms_1.Validators.required);
        this.url = 'http://localhost:8000/service';
        this.progress = 0;
        this.onClear = new core_1.EventEmitter();
    }
    // event fired when the user selects an image
    AdminHandymanComponent.prototype.onFileSelect = function (event) {
        this.clear();
        var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (this.isImage(file)) {
                file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                this.files.push(files[i]);
            }
            else if (!this.isImage(file)) {
                // this.toastr.error('Only images are allowed');
                console.log('Only images are allowed.');
            }
        }
    };
    // check if the image is actually an image by checking the mime type
    AdminHandymanComponent.prototype.isImage = function (file) {
        if (!file.type.match('image/*')) {
            // this.toastr.error('Only images are allowed');
            console.log('Only images are allowed.');
            return false;
        }
        return true;
    };
    // check if the form has files ready to be uploaded
    AdminHandymanComponent.prototype.hasFiles = function () {
        return this.files && this.files.length > 0;
    };
    // clears the form
    AdminHandymanComponent.prototype.clear = function () {
        this.files = [];
        this.onClear.emit();
    };
    // remove the image from the preview
    AdminHandymanComponent.prototype.remove = function (index) {
        this.files.splice(index, 1);
        this.fileInput.nativeElement.value = '';
    };
    // check the image file size
    // validate(file: File): boolean {
    //     if (this.maxSize && file.size > this.maxSize) {
    //         this.toastr.error(this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxSize)),
    //             this.invalidFileSizeMessage.replace('{0}', file.name));
    //         return false;
    //     }
    //     return true;
    // }
    // format the size to display it in toastr in case the user uploaded a file bigger than 5MB
    // formatSize(bytes) {
    //     if (bytes === 0) {
    //         return '0 B';
    //     }
    //     let k = 1000,
    //         dm = 3,
    //         sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    //         i = Math.floor(Math.log(bytes) / Math.log(k));
    //
    //     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    // }
    AdminHandymanComponent.prototype.ngOnInit = function () {
        this.readServices();
        this.readServiceLists();
        this.files = [];
        this.addServiceForm = this.formBuilder.group({
            serviceName: this.serviceName,
            serviceDescription: this.serviceDescription
        });
        this.addServiceListForm = this.formBuilder.group({
            serviceListName: this.serviceListName,
            serviceListDescription: this.serviceListDescription
        });
    };
    //=====================Service Data Connections==================================
    // createService() {
    //     this.dataService.createService(this.addServiceForm.value).subscribe(
    //         res => {
    //             let newService = res.json();
    //             console.log("AdminHandymanComponent new service is: " + JSON.stringify(newService));
    //             this.services.push(newService);
    //             console.log('Create service successfull at Admin-Handyman.component');
    //             this.addServiceForm.reset();
    //         },
    //         error => console.log('Create error at Admin-handyman.component. error:  ' + error)
    //     );
    // }
    // submit the form to back end
    AdminHandymanComponent.prototype.createService = function () {
        var _this = this;
        this.submitStarted = true;
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
            console.log('On Admin component, it shows this.files[i].name as: ' + this.files[i].name);
            formData.append('serviceImage', this.files[i], this.files[i].name);
        }
        xhr.upload.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
                _this.progress = Math.round((event.loaded * 100) / event.total);
            }
        }, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                _this.progress = 0;
                // if (xhr.status === 201) {
                //   this.router.navigateByUrl('/user/forms');
                //   // this.toastr.success('Form submitted successfully');
                //   console.log('Service Form submitted successfully');
                // } else if (xhr.status !== 201) {
                //   // this.toastr.error('There was an error!');
                //   console.log('Service Form, there was an error!');
                // }
                _this.clear();
            }
        };
        xhr.open('POST', this.url, true);
        formData.append('serviceName', this.addServiceForm.value.serviceName);
        formData.append('serviceDescription', this.addServiceForm.value.serviceDescription);
        console.log('Xhr shows the formData as: ' + formData.serviceName);
        // xhr.withCredentials = true;
        xhr.send(formData);
        console.log(xhr);
    };
    AdminHandymanComponent.prototype.clearServiceForm = function () {
        this.addServiceForm.reset();
    };
    AdminHandymanComponent.prototype.readServices = function () {
        var _this = this;
        this.dataService.readServices().subscribe(
        // data => {
        //   console.log('Read services succesfull at Admin-Handyman.component');
        //   this.services = data;
        // },
        function (data) { return _this.services = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    AdminHandymanComponent.prototype.enableEditing = function (service) {
        this.isEditing = true;
        this.service = service;
    };
    AdminHandymanComponent.prototype.cancelEditing = function () {
        this.isEditing = false;
        this.service = {};
        this.readServices();
    };
    AdminHandymanComponent.prototype.updateService = function (service) {
        var _this = this;
        this.dataService.updateService(service).subscribe(function (res) {
            _this.isEditing = false;
            _this.service = service;
            console.log('Update service successfull at Admin-Handyman.component, service:  ' + JSON.stringify(_this.service));
        }, function (error) { return console.log('Update service Failed at Admin-Handyman.component. error: ' + error + "THIS IS THE SERVICE:  " + +JSON.stringify(_this.service)); });
    };
    AdminHandymanComponent.prototype.deleteService = function (service) {
        var _this = this;
        if (window.confirm('Are you sure you want to permanently delete this service?')) {
            this.dataService.deleteService(service).subscribe(function (res) {
                console.log('Delete service successfull at Admin-Handyman.component.');
                var pos = _this.services.map(function (elem) { return elem._id; }).indexOf(service._id);
                _this.services.splice(pos, 1);
            }, function (error) { return console.log('Delete service Failed at Admin-Handyman.component. error: ' + error); });
        }
    };
    //==========================Service List Data Connections========================
    AdminHandymanComponent.prototype.createServiceList = function () {
        var _this = this;
        this.dataService.createServiceList(this.addServiceListForm.value).subscribe(function (res) {
            var newServiceList = res.json();
            console.log("AdminHandymanComponent new service list is: " + JSON.stringify(newServiceList));
            _this.serviceLists.push(newServiceList);
            console.log('Create service list successfull at Admin-Handyman.component');
        }, function (error) { return console.log('Create error at service list in Admin-handyman.component. error:  ' + error); });
        // readServiceLists();
        this.addServiceListForm.reset();
    };
    AdminHandymanComponent.prototype.clearServiceListForm = function () {
        this.addServiceListForm.reset();
    };
    AdminHandymanComponent.prototype.readServiceLists = function () {
        var _this = this;
        this.dataService.readServiceLists().subscribe(
        // data => {
        //   console.log('Read services succesfull at Admin-Handyman.component');
        //   this.services = data;
        // },
        function (data) { return _this.serviceLists = data; }, function (error) { return console.log(error); }, function () { return _this.serviceListIsLoading = false; });
    };
    AdminHandymanComponent.prototype.enableServiceListEditing = function (serviceList) {
        this.serviceListIsEditing = true;
        this.serviceList = serviceList;
    };
    AdminHandymanComponent.prototype.cancelServiceListEditing = function () {
        this.serviceListIsEditing = false;
        this.serviceList = {};
        this.readServiceLists();
    };
    AdminHandymanComponent.prototype.updateServiceList = function (serviceList) {
        var _this = this;
        this.dataService.updateServiceList(serviceList).subscribe(function (res) {
            _this.serviceListIsEditing = false;
            _this.serviceList = serviceList;
            console.log('Update service list successfull at Admin-Handyman.component, service:  ' + JSON.stringify(_this.serviceList));
        }, function (error) { return console.log('Update service list Failed at Admin-Handyman.component. error: ' + error + "THIS IS THE SERVICE:  " + +JSON.stringify(_this.serviceList)); });
    };
    AdminHandymanComponent.prototype.deleteServiceList = function (serviceList) {
        var _this = this;
        if (window.confirm('Are you sure you want to permanently delete this service list item?')) {
            this.dataService.deleteServiceList(serviceList).subscribe(function (res) {
                console.log('Delete service list successfull at Admin-Handyman.component.');
                var pos = _this.serviceLists.map(function (elem) { return elem._id; }).indexOf(serviceList._id);
                _this.serviceLists.splice(pos, 1);
            }, function (error) { return console.log('Delete service list Failed at Admin-Handyman.component. error: ' + error); });
        }
    };
    return AdminHandymanComponent;
}());
__decorate([
    core_1.ViewChild('nameField'),
    __metadata("design:type", core_1.ElementRef)
], AdminHandymanComponent.prototype, "nameField", void 0);
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], AdminHandymanComponent.prototype, "fileInput", void 0);
AdminHandymanComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-admin',
        templateUrl: 'admin-handyman.component.html',
        styleUrls: [
            './styles/admin-handyman.component.css',
            './styles/admin-handyman-top_title.component.css',
            './styles/admin-handyman-admin_top_gallery.component.css',
            './styles/admin-handyman-admin_services.component.css',
            './styles/admin-handyman-admin_reviews.component.css',
            './styles/dropzone.css',
        ],
    }),
    __metadata("design:paramtypes", [http_1.Http,
        data_service_1.DataService,
        router_1.Router,
        platform_browser_1.DomSanitizer,
        core_1.Renderer,
        forms_1.FormBuilder])
], AdminHandymanComponent);
exports.AdminHandymanComponent = AdminHandymanComponent;
//# sourceMappingURL=admin-handyman.component.js.map