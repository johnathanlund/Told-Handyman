"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var told_handyman_component_1 = require("./told-handyman.component");
var admin_handyman_component_1 = require("./admin-handyman.component");
var uploadImage_component_1 = require("./UploadImage/uploadImage.component");
var data_service_1 = require("./services/data.service");
var image_preview_directive_1 = require("./directives/image-preview.directive");
// import { FileUploadComponent }    from './fileUpload.component';
// import { DropzoneModule }         from 'angular2-dropzone-wrapper';
// import { DropzoneConfigInterface} from 'angular2-dropzone-wrapper';
// import { UploadService }          from './services/upload.service';
var ng2_page_scroll_1 = require("ng2-page-scroll/ng2-page-scroll");
var ng2_modal_1 = require("ng2-modal");
var ng2_progress_bar_1 = require("ng2-progress-bar");
var file_upload_module_1 = require("ng2-file-upload/file-upload/file-upload.module");
var angular2_useful_swiper_1 = require("angular2-useful-swiper");
// const DROPZONE_CONFIG: DropzoneConfigInterface = {
//   // Change this to your upload POST address:
//   server: 'https://localhost:8000/upload',
//   maxFilesize: 10,
//   acceptedFiles: 'image/*'
// };
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
            file_upload_module_1.FileUploadModule,
            ng2_modal_1.ModalModule,
            common_1.CommonModule,
            ng2_progress_bar_1.ProgressBarModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            told_handyman_component_1.ToldHandymanComponent,
            admin_handyman_component_1.AdminHandymanComponent,
            uploadImage_component_1.UploadImageComponent,
            image_preview_directive_1.ImagePreview,
        ],
        providers: [data_service_1.DataService],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map