import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule }           from '@angular/common';
import { Component }              from '@angular/core';

import { AppRoutingModule }       from './app-routing.module';
import { HttpModule }             from '@angular/http';

import { AppComponent }           from './app.component';
import { ToldHandymanComponent }  from './told-handyman/told-handyman.component';
import { AdminHandymanComponent } from './admin-handyman/admin-handyman.component';
import { LoginComponent }         from './login/login.component';
import { RegisterComponent }      from './register/register.component';
import { UploadImageComponent }   from './UploadImage/uploadImage.component';

import { DataService }            from './_services/data.service';
import { AuthenticationService }  from './_services/authentication.service';
import { UserService }            from './_services/user.service';
import { ImagePreview }           from './_directives/image-preview.directive';
import { AuthService }              from './_guards/auth.service';
import { AppConfig }              from './app.config';

// import { FileUploadComponent }    from './fileUpload.component';
// import { DropzoneModule }         from 'angular2-dropzone-wrapper';
// import { DropzoneConfigInterface} from 'angular2-dropzone-wrapper';
// import { UploadService }          from './services/upload.service';

import { Ng2PageScrollModule }    from 'ng2-page-scroll/ng2-page-scroll';
import { ModalModule }            from 'ng2-modal';
import { FileUploadModule }       from 'ng2-file-upload/file-upload/file-upload.module';
import { SwiperModule }           from 'angular2-useful-swiper';

// const DROPZONE_CONFIG: DropzoneConfigInterface = {
//   // Change this to your upload POST address:
//   server: 'https://localhost:8000/upload',
//   maxFilesize: 10,
//   acceptedFiles: 'image/*'
// };

@NgModule({
  imports:      [
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
    // DropzoneModule.forRoot(DROPZONE_CONFIG),
  ],
  declarations: [
    AppComponent,
    ToldHandymanComponent,
    AdminHandymanComponent,
    LoginComponent,
    RegisterComponent,
    UploadImageComponent,
    ImagePreview,
    // DropzoneComponent,
    // FileUploadComponent,
  ],
  providers: [ DataService, AppConfig, AuthService, AuthenticationService, UserService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap:    [ AppComponent ],
})
export class AppModule {}
