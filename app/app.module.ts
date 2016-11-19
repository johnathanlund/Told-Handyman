import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }   from './app.component';
import { ToldHandymanComponent }  from './told-handyman.component';
import { AdminHandymanComponent } from './admin-handyman.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ToldHandymanComponent,
    AdminHandymanComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
