"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var told_handyman_component_1 = require("./told-handyman.component");
var admin_handyman_component_1 = require("./admin-handyman.component");
var data_service_1 = require("./services/data.service");
var fileUpload_component_1 = require("./fileUpload.component");
var angular2_dropzone_wrapper_1 = require("angular2-dropzone-wrapper");
var upload_service_1 = require("./services/upload.service");
// import { Dropzone }               from 'dropzone';
var ng2_page_scroll_1 = require("ng2-page-scroll/ng2-page-scroll");
var ng2_modal_1 = require("ng2-modal");
var angular2_useful_swiper_1 = require("angular2-useful-swiper");
var DROPZONE_CONFIG = {
    // Change this to your upload POST address:
    server: 'https://localhost:8000/upload',
    maxFilesize: 10,
    acceptedFiles: 'image/*'
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule,
            ng2_page_scroll_1.Ng2PageScrollModule.forRoot(),
            angular2_useful_swiper_1.SwiperModule,
            ng2_modal_1.ModalModule,
            common_1.CommonModule,
            angular2_dropzone_wrapper_1.DropzoneModule.forRoot(DROPZONE_CONFIG),
        ],
        declarations: [
            app_component_1.AppComponent,
            told_handyman_component_1.ToldHandymanComponent,
            admin_handyman_component_1.AdminHandymanComponent,
            fileUpload_component_1.FileUploadComponent,
        ],
        providers: [data_service_1.DataService, upload_service_1.UploadService],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map