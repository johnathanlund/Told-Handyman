"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
/**
 * Demo  Component Bootstrap- Start
 */
var accordion_demo_component_1 = require("./com-impl/accordion/accordion-demo.component");
var alert_demo_component_1 = require("./com-impl/alert/alert-demo.component");
var button_demo_component_1 = require("./com-impl/buttons/button-demo.component");
var carousel_demo_component_1 = require("./com-impl/carousel/carousel-demo.component");
var collapse_demo_component_1 = require("./com-impl/collapse/collapse-demo.component");
var dropdown_demo_component_1 = require("./com-impl/dropdown/dropdown-demo.component");
var modal_demo_component_1 = require("./com-impl/modal/modal-demo.component");
var progressbar_demo_component_1 = require("./com-impl/progressbar/progressbar-demo.component");
var rating_demo_component_1 = require("./com-impl/rating/rating-demo.component");
var tabs_demo_component_1 = require("./com-impl/tabs/tabs-demo.component");
var tooltip_demo_component_1 = require("./com-impl/tooltip/tooltip-demo.component");
var typeahead_demo_component_1 = require("./com-impl/typeahead/typeahead-demo.component");
var pagination_demo_component_1 = require("./com-impl/pagination/pagination-demo.component");
var datepicker_demo_component_1 = require("./com-impl/datepicker/datepicker-demo.component");
var timepicker_demo_component_1 = require("./com-impl/timepicker/timepicker-demo.component");
/**
* Demo  Component Bootstrap- End
*/
/**
 * Router Module - Start
 */
var router_1 = require("@angular/router");
/**
 * Router Module - End
 */
/**
 * Bootstrap Modules - Start
 */
var alert_module_1 = require("./com/alert/alert.module");
var accordion_module_1 = require("./com/accordion/accordion.module");
var buttons_module_1 = require("./com/buttons/buttons.module");
var carousel_module_1 = require("./com/carousel/carousel.module");
var dropdown_module_1 = require("./com/dropdown/dropdown.module");
var modal_module_1 = require("./com/modal/modal.module");
var progressbar_module_1 = require("./com/progressbar/progressbar.module");
var rating_module_1 = require("./com/rating/rating.module");
var tabs_module_1 = require("./com/tabs/tabs.module");
var tooltip_module_1 = require("./com/tooltip/tooltip.module");
var typeahead_module_1 = require("./com/typeahead/typeahead.module");
var collapse_module_1 = require("./com/collapse/collapse.module");
var pagination_module_1 = require("./com/pagination/pagination.module");
var datepicker_module_1 = require("./com/datepicker/datepicker.module");
var timepicker_module_1 = require("./com/timepicker/timepicker.module");
/**
 * Bootstrap Modules - End
 */
/**
 * Other Modules - Start
 */
var NgGrid_module_1 = require("./com/grid/modules/NgGrid.module"); // grid system
var core_2 = require("./com/googlemaps/core"); // google maps
var ng2_uploader_1 = require("./com/fileupload/ng2-uploader");
/**
 * Other Modules - End
 */
/**
 * Demo Other Modules  Components - Start
 */
var grid_demo_component_1 = require("./com-impl/grid/grid-demo.component"); // grid system demo
var googlemaps_demo_component_1 = require("./com-impl/googlemaps/googlemaps-demo.component"); // google maps demo
var fileupload_demo_component_1 = require("./com-impl/fileupload/fileupload-demo.component"); // google maps demo
/**
 * Demo Other Modules  Components - End
 */
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            accordion_demo_component_1.AccordionDemoComponent,
            alert_demo_component_1.AlertDemoComponent,
            button_demo_component_1.ButtonDemoComponent,
            carousel_demo_component_1.CarouselDemoComponent,
            collapse_demo_component_1.CollapseDemoComponent,
            dropdown_demo_component_1.DropdownDemoComponent,
            modal_demo_component_1.ModalDemoComponent,
            progressbar_demo_component_1.ProgressbarDemoComponent,
            rating_demo_component_1.RatingDemoComponent,
            tabs_demo_component_1.TabsDemoComponent,
            tooltip_demo_component_1.TooltipDemoComponent,
            typeahead_demo_component_1.TypeaheadDemoComponent,
            datepicker_demo_component_1.DatepickerDemoComponent,
            timepicker_demo_component_1.TimepickerDemoComponent,
            pagination_demo_component_1.PaginationDemoComponent,
            grid_demo_component_1.GridDemoComponent,
            googlemaps_demo_component_1.GoogleMapsDemoComponent,
            ng2_uploader_1.UPLOAD_DIRECTIVES,
            fileupload_demo_component_1.FileUploadDemoComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            alert_module_1.AlertModule,
            accordion_module_1.AccordionModule,
            buttons_module_1.ButtonsModule,
            carousel_module_1.CarouselModule,
            collapse_module_1.CollapseModule,
            dropdown_module_1.DropdownModule,
            modal_module_1.ModalModule,
            progressbar_module_1.ProgressbarModule,
            rating_module_1.RatingModule,
            tabs_module_1.TabsModule,
            tooltip_module_1.TooltipModule,
            typeahead_module_1.TypeaheadModule,
            datepicker_module_1.DatepickerModule,
            timepicker_module_1.TimepickerModule,
            pagination_module_1.PaginationModule,
            NgGrid_module_1.NgGridModule,
            core_2.AgmCoreModule.forRoot({
                apiKey: 'Your - > Google-MAPS-API-KEY - here' //google maps api key
            }),
            // 
            router_1.RouterModule.forRoot([
                {
                    path: '',
                    component: alert_demo_component_1.AlertDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'alert',
                    component: alert_demo_component_1.AlertDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'accordion',
                    component: accordion_demo_component_1.AccordionDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'button',
                    component: button_demo_component_1.ButtonDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'carousel',
                    component: carousel_demo_component_1.CarouselDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'collapse',
                    component: collapse_demo_component_1.CollapseDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'dropdown',
                    component: dropdown_demo_component_1.DropdownDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'modal',
                    component: modal_demo_component_1.ModalDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'progressbar',
                    component: progressbar_demo_component_1.ProgressbarDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'rating',
                    component: rating_demo_component_1.RatingDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'tabs',
                    component: tabs_demo_component_1.TabsDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'tooltip',
                    component: tooltip_demo_component_1.TooltipDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'typeahead',
                    component: typeahead_demo_component_1.TypeaheadDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'datepicker',
                    component: datepicker_demo_component_1.DatepickerDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'timepicker',
                    component: timepicker_demo_component_1.TimepickerDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'pagination',
                    component: pagination_demo_component_1.PaginationDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'grid',
                    component: grid_demo_component_1.GridDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'googlemaps',
                    component: googlemaps_demo_component_1.GoogleMapsDemoComponent
                }
            ]),
            router_1.RouterModule.forRoot([
                {
                    path: 'fileupload',
                    component: fileupload_demo_component_1.FileUploadDemoComponent
                }
            ]),
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map