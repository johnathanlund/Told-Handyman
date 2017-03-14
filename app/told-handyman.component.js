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
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var data_service_1 = require("./services/data.service");
var ToldHandymanComponent = (function () {
    function ToldHandymanComponent(http, dataService, formBuilder) {
        this.http = http;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.contactName = new forms_1.FormControl('', forms_1.Validators.required);
        this.contactEmail = new forms_1.FormControl('', forms_1.Validators.required);
        this.contactPhone1of3 = new forms_1.FormControl('', forms_1.Validators.required);
        this.contactPhone2of3 = new forms_1.FormControl('', forms_1.Validators.required);
        this.contactPhone3of3 = new forms_1.FormControl('', forms_1.Validators.required);
        this.contactMessage = new forms_1.FormControl('', forms_1.Validators.required);
        this.phoneCombined = '';
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
        };
        this.gallerys = [];
        this.galleryIsLoading = true;
        this.gallery = {};
        this.galleryIsEditing = false;
        this.services = [];
        this.isLoading = true;
        this.service = {};
        this.isEditing = false;
        this.serviceLists = [];
        this.isLoadingList = true;
        this.serviceList = {};
        this.isEditingList = false;
        this.reviews = [];
        this.reviewIsLoading = true;
        this.review = {};
        this.reviewIsEditing = false;
    }
    ToldHandymanComponent.prototype.ngOnInit = function () {
        this.readGallerys();
        this.readServices();
        this.readServiceLists();
        this.readReviews();
        this.addContactForm = this.formBuilder.group({
            contactName: this.contactName,
            contactEmail: this.contactEmail,
            contactPhone1of3: this.contactPhone1of3,
            contactPhone2of3: this.contactPhone2of3,
            contactPhone3of3: this.contactPhone3of3,
            // contactPhone: this.phoneCombined,
            // contactPhone1of3 + contactPhone2of3 + contactPhone3of3: this.contactPhone,
            contactMessage: this.contactMessage,
        });
        this.phoneCombined = this.addContactForm.value.contactPhone1of3;
    };
    //===============Contact Form Connections=====================================
    ToldHandymanComponent.prototype.createContactForm = function () {
        var _this = this;
        // this.addContactForm.value.contactPhone = this.phoneCombined;
        // console.log(" PART 2 Create Contact Form shows contactPhone as: " + this.addContactForm.value.contactPhone);
        console.log("Create Contact Form shows contactPhone as: " + '(' + this.addContactForm.value.contactPhone1of3 + ')' + this.addContactForm.value.contactPhone2of3 + '-' + this.addContactForm.value.contactPhone3of3);
        // console.log("PART 3 Create Contact Form shows phoneCombined as: " + this.phoneCombined);
        this.dataService.createContactForm(this.addContactForm.value).subscribe(function (res) {
            var newContactForm = res.json();
            console.log("Create contact form successfull at AdminHandymanComponent.");
            _this.addContactForm.reset();
        }, function (error) { return console.log('Create contact form error at AdminHandymanComponent.'); });
    };
    ToldHandymanComponent.prototype.readGallerys = function () {
        var _this = this;
        this.dataService.readGallerys().subscribe(function (data) { return _this.gallerys = data; }, function (error) { return console.log(error); }, function () { return _this.galleryIsLoading = false; });
    };
    ToldHandymanComponent.prototype.readServices = function () {
        var _this = this;
        this.dataService.readServices().subscribe(function (data) { return _this.services = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    ToldHandymanComponent.prototype.readServiceLists = function () {
        var _this = this;
        this.dataService.readServiceLists().subscribe(function (data) { return _this.serviceLists = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    ToldHandymanComponent.prototype.readReviews = function () {
        var _this = this;
        this.dataService.readReviews().subscribe(
        // console.log("Reading Reviews from Told Handyman component."),
        function (data) { return _this.reviews = data; }, function (error) { return console.log(error); }, function () { return _this.reviewIsLoading = false; });
    };
    return ToldHandymanComponent;
}());
ToldHandymanComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-handyman',
        templateUrl: 'told-handyman.component.html',
        styleUrls: [
            './styles/told-handyman.component.css',
            './styles/told-handyman-top_title.component.css',
            './styles/told-handyman-top_menu.component.css',
            './styles/told-handyman-top_gallery.component.css',
            './styles/told-handyman-mid_services.component.css',
            './styles/told-handyman-mid_about.component.css',
            './styles/told-handyman-mid_reviews.component.css',
            './styles/told-handyman-bottom_contact.component.css',
            './styles/told-handyman-bottom_footer.component.css',
        ]
    }),
    __metadata("design:paramtypes", [http_1.Http,
        data_service_1.DataService,
        forms_1.FormBuilder])
], ToldHandymanComponent);
exports.ToldHandymanComponent = ToldHandymanComponent;
//# sourceMappingURL=told-handyman.component.js.map