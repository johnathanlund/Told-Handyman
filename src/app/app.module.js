var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ToldHandymanComponent } from './told-handyman/told-handyman.component';
import { AdminHandymanComponent } from './admin-handyman/admin-handyman.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyModalComponent } from './_directives/myModal.component';
import { UploadImageComponent } from './UploadImage/uploadImage.component';
import { DataService } from './_services/data.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { MyModalService } from './_services/myModal.service';
import { ImagePreview } from './_directives/image-preview.directive';
import { AuthService } from './_guards/auth.service';
import { AppConfig } from './app.config';
// import { FileUploadComponent }    from './fileUpload.component';
// import { DropzoneModule }         from 'angular2-dropzone-wrapper';
// import { DropzoneConfigInterface} from 'angular2-dropzone-wrapper';
// import { UploadService }          from './services/upload.service';
import { Ng2PageScrollModule } from 'ng2-page-scroll/ng2-page-scroll';
import { ModalModule } from 'ng2-modal';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { SwiperModule } from 'angular2-useful-swiper';
// const DROPZONE_CONFIG: DropzoneConfigInterface = {
//   // Change this to your upload POST address:
//   server: 'https://localhost:8000/upload',
//   maxFilesize: 10,
//   acceptedFiles: 'image/*'
// };
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                AppRoutingModule,
                HttpModule,
                Ng2PageScrollModule.forRoot(),
                SwiperModule,
                FileUploadModule,
                ModalModule,
                CommonModule,
            ],
            declarations: [
                AppComponent,
                ToldHandymanComponent,
                AdminHandymanComponent,
                LoginComponent,
                RegisterComponent,
                UploadImageComponent,
                MyModalComponent,
                ImagePreview,
            ],
            providers: [
                DataService,
                AppConfig,
                AuthService,
                AuthenticationService,
                UserService,
                MyModalService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            bootstrap: [AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map