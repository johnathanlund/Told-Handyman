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
var forms_1 = require("@angular/forms");
var data_service_1 = require("./services/data.service");
// import { FileUploadComponent }  from './fileUpload.component';
// import { UploadService }  from './services/upload.service';
// import { DropzoneModule }         from 'angular2-dropzone-wrapper';
// import { DropzoneComponent }  from './dropzone.component';
var AdminHandymanComponent = (function () {
    function AdminHandymanComponent(http, dataService, 
        // private uploadService: UploadService,
        formBuilder) {
        this.http = http;
        this.dataService = dataService;
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
    }
    AdminHandymanComponent.prototype.ngOnInit = function () {
        this.readServices();
        this.readServiceLists();
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
    AdminHandymanComponent.prototype.createService = function () {
        var _this = this;
        this.dataService.createService(this.addServiceForm.value).subscribe(function (res) {
            var newService = res.json();
            console.log("AdminHandymanComponent new service is: " + JSON.stringify(newService));
            _this.services.push(newService);
            console.log('Create service successfull at Admin-Handyman.component');
            _this.addServiceForm.reset();
        }, function (error) { return console.log('Create error at Admin-handyman.component. error:  ' + error); });
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
        forms_1.FormBuilder])
], AdminHandymanComponent);
exports.AdminHandymanComponent = AdminHandymanComponent;
//# sourceMappingURL=admin-handyman.component.js.map