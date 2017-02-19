import { NgModule, CUSTOM_ELEMENTS_SCHEMA }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }            from '@angular/forms';

import { Component }                from '@angular/core';

import { AppRoutingModule }       from './app-routing.module';
import { HttpModule }             from '@angular/http';

import { AppComponent }           from './app.component';
import { ToldHandymanComponent }  from './told-handyman.component';
import { AdminHandymanComponent } from './admin-handyman.component';
import { DataService } from './services/data.service';

import { Ng2PageScrollModule }      from 'ng2-page-scroll/ng2-page-scroll';
import { ModalModule }            from 'ng2-modal';

import { SwiperModule }           from 'angular2-useful-swiper';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    Ng2PageScrollModule.forRoot(),
    SwiperModule,
    ModalModule,
  ],
  declarations: [
    AppComponent,
    ToldHandymanComponent,
    AdminHandymanComponent
  ],
  providers: [ DataService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
