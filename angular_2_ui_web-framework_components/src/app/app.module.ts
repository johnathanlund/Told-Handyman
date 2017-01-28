import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

/**
 * Demo  Component Bootstrap- Start
 */
 
import { AccordionDemoComponent } from './com-impl/accordion/accordion-demo.component';
import { AlertDemoComponent } from './com-impl/alert/alert-demo.component';
import { ButtonDemoComponent } from './com-impl/buttons/button-demo.component';
import { CarouselDemoComponent } from './com-impl/carousel/carousel-demo.component';
import { CollapseDemoComponent } from './com-impl/collapse/collapse-demo.component';
import { DropdownDemoComponent } from './com-impl/dropdown/dropdown-demo.component';
import { ModalDemoComponent } from './com-impl/modal/modal-demo.component';
import { ProgressbarDemoComponent } from './com-impl/progressbar/progressbar-demo.component';
import { RatingDemoComponent } from './com-impl/rating/rating-demo.component';
import { TabsDemoComponent } from './com-impl/tabs/tabs-demo.component';
import { TooltipDemoComponent } from './com-impl/tooltip/tooltip-demo.component';
import { TypeaheadDemoComponent } from './com-impl/typeahead/typeahead-demo.component';
import { PaginationDemoComponent } from './com-impl/pagination/pagination-demo.component';
import { DatepickerDemoComponent } from './com-impl/datepicker/datepicker-demo.component';
import { TimepickerDemoComponent } from './com-impl/timepicker/timepicker-demo.component';

 /**
 * Demo  Component Bootstrap- End
 */

/**
 * Router Module - Start
 */
import { RouterModule }   from '@angular/router';
/**
 * Router Module - End
 */

/**
 * Bootstrap Modules - Start
 */
import { AlertModule } from './com/alert/alert.module';
import { AccordionModule } from './com/accordion/accordion.module';
import { ButtonsModule } from './com/buttons/buttons.module';
import { CarouselModule } from './com/carousel/carousel.module';
import { DropdownModule } from './com/dropdown/dropdown.module';
import { ModalModule } from './com/modal/modal.module';
import { ProgressbarModule } from './com/progressbar/progressbar.module';
import { RatingModule } from './com/rating/rating.module';
import { TabsModule } from './com/tabs/tabs.module';
import { TooltipModule } from './com/tooltip/tooltip.module';
import { TypeaheadModule } from './com/typeahead/typeahead.module';
import { CollapseModule } from './com/collapse/collapse.module';
import { PaginationModule } from './com/pagination/pagination.module';
import { DatepickerModule } from './com/datepicker/datepicker.module';
import { TimepickerModule } from './com/timepicker/timepicker.module';

/**
 * Bootstrap Modules - End
 */

/**
 * Other Modules - Start
 */
import { NgGridModule } from './com/grid/modules/NgGrid.module'; // grid system
import { AgmCoreModule } from './com/googlemaps/core'; // google maps
import { UPLOAD_DIRECTIVES } from './com/fileupload/ng2-uploader';
/**
 * Other Modules - End
 */

/**
 * Demo Other Modules  Components - Start
 */

import { GridDemoComponent } from './com-impl/grid/grid-demo.component'; // grid system demo
import { GoogleMapsDemoComponent } from './com-impl/googlemaps/googlemaps-demo.component'; // google maps demo
import { FileUploadDemoComponent } from './com-impl/fileupload/fileupload-demo.component'; // google maps demo
/**
 * Demo Other Modules  Components - End
 */


 
 


@NgModule({
  declarations: [
    AppComponent,
    AccordionDemoComponent,
    AlertDemoComponent,
    ButtonDemoComponent,
    CarouselDemoComponent,
    CollapseDemoComponent,
    DropdownDemoComponent,
    ModalDemoComponent,
    ProgressbarDemoComponent,
    RatingDemoComponent,
    TabsDemoComponent,
    TooltipDemoComponent,
    TypeaheadDemoComponent,
    DatepickerDemoComponent,
    TimepickerDemoComponent,
    PaginationDemoComponent,
    GridDemoComponent,
    GoogleMapsDemoComponent,
    UPLOAD_DIRECTIVES,
    FileUploadDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,       
    HttpModule,
    AlertModule,
    AccordionModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    DropdownModule,
    ModalModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule,
    DatepickerModule,
    TimepickerModule,
    PaginationModule,
    NgGridModule,//grid
    AgmCoreModule.forRoot({
      apiKey: 'Your - > Google-MAPS-API-KEY - here' //google maps api key
    }),//google maps
   // 

    RouterModule.forRoot([
      {
        path: '',
        component: AlertDemoComponent
      }
    ]),

    RouterModule.forRoot([
      {
        path: 'alert',
        component: AlertDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'accordion',
        component: AccordionDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'button',
        component: ButtonDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'carousel',
        component: CarouselDemoComponent
      }
    ]),
   RouterModule.forRoot([
      {
        path: 'collapse',
        component: CollapseDemoComponent
      }
    ]),    
    RouterModule.forRoot([
      {
        path: 'dropdown',
        component: DropdownDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'modal',
        component: ModalDemoComponent
      }
    ]),
     RouterModule.forRoot([
      {
        path: 'progressbar',
        component: ProgressbarDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'rating',
        component: RatingDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'tabs',
        component: TabsDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'tooltip',
        component: TooltipDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'typeahead',
        component: TypeaheadDemoComponent
      }
    ]),
    
    RouterModule.forRoot([
      {
        path: 'datepicker',
        component: DatepickerDemoComponent
      }
    ]),
   RouterModule.forRoot([
      {
        path: 'timepicker',
        component: TimepickerDemoComponent
      }
    ]),
     
    RouterModule.forRoot([
      {
        path: 'pagination',
        component: PaginationDemoComponent
      }
    ]),
      
    
   RouterModule.forRoot([
      {
        path: 'grid',
        component: GridDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'googlemaps',
        component: GoogleMapsDemoComponent
      }
    ]),
    RouterModule.forRoot([
      {
        path: 'fileupload',
        component: FileUploadDemoComponent
      }
    ]),


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
