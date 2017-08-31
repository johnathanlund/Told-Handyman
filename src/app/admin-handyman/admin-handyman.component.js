var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_guards/auth.service';
import { AppConfig } from '../app.config';
import { MyModalService } from '../_services/myModal.service';
var URL = 'http://localhost:5000/upload';
var AdminHandymanComponent = (function () {
    function AdminHandymanComponent(http, router, dataService, authService, modalService, config, formBuilder) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.dataService = dataService;
        this.authService = authService;
        this.modalService = modalService;
        this.config = config;
        this.formBuilder = formBuilder;
        this.modalName = '';
        this.imageName = '';
        this.gallerys = [];
        this.galleryIsLoading = true;
        this.gallery = {};
        this.galleryIsEditing = false;
        this.galleryName = new FormControl('', Validators.required);
        this.galleryDescription = new FormControl('', Validators.required);
        this.services = [];
        this.isLoading = true;
        this.service = {};
        this.isEditing = false;
        this.serviceName = new FormControl('', Validators.required);
        this.serviceDescription = new FormControl('', Validators.required);
        this.serviceLists = [];
        this.serviceListIsLoading = true;
        this.serviceList = {};
        this.serviceListIsEditing = false;
        this.serviceListName = new FormControl('', Validators.required);
        this.serviceListDescription = new FormControl('', Validators.required);
        this.reviews = [];
        this.reviewIsLoading = true;
        this.review = {};
        this.reviewIsEditing = false;
        this.reviewAuthor = new FormControl('', Validators.required);
        this.reviewLocation = new FormControl('', Validators.required);
        this.reviewMessage = new FormControl('', Validators.required);
        this.uploader = new FileUploader({ url: URL, itemAlias: 'photo' });
        this.articles = [];
        this.subscription = authService.user$.subscribe(function (user) { return _this.user = user; });
    }
    AdminHandymanComponent.prototype.ngAfterViewInit = function () {
        // this.modalName = document.getElementById('myModal');
        console.log('FROM NGAFTERVIEWINIT SHOWS: ' + document.getElementById('myModal'));
    };
    AdminHandymanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        //example of verification
        this.authService.verify().subscribe(function (res) { return _this.message = res['message']; });
        // var imageName = '';
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
            file.file.name = file.file.name + '-' + Date.now();
            _this.imageName = file.file.name;
            console.log('Within ngOnInit, imageName now is equal to: ' + _this.imageName);
        };
        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload in QUEUE SHOWS: " + _this.uploader.queue[0]);
            console.log("ImageUpload:uploaded:", item, " Thats the item. ", status, " Thats the status. ", response, " THats the response.", item.file.name);
            _this.uploader.queue.length = 0;
            // this.uploader.queue[0].remove();
            console.log('What is in the uploader.queue is: ' + _this.uploader.queue.length);
        };
        this.readGallerys();
        this.readServices();
        this.readServiceLists();
        this.readReviews();
        this.addGalleryForm = this.formBuilder.group({
            galleryName: this.galleryName,
            galleryDescription: this.galleryDescription,
            galleryImage: this.imageName
        });
        this.addServiceForm = this.formBuilder.group({
            serviceName: this.serviceName,
            serviceDescription: this.serviceDescription,
            serviceImage: this.imageName
        });
        this.addServiceListForm = this.formBuilder.group({
            serviceListName: this.serviceListName,
            serviceListDescription: this.serviceListDescription
        });
        this.addReviewForm = this.formBuilder.group({
            reviewAuthor: this.reviewAuthor,
            reviewLocation: this.reviewLocation,
            reviewMessage: this.reviewMessage,
            reviewImage: this.imageName
        });
    };
    AdminHandymanComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    };
    AdminHandymanComponent.prototype.logout = function () {
        this.authService.logout();
        this.user = null;
        this.message = "Logged out";
        this.router.navigate(['AdminHandyman']);
    };
    //=====================Gallery Data Connections==================================
    AdminHandymanComponent.prototype.createGallery = function () {
        var _this = this;
        this.addGalleryForm.value.galleryImage = this.imageName;
        this.dataService.createGallery(this.addGalleryForm.value).subscribe(function (res) {
            var newGallery = res.json();
            _this.gallerys.push(newGallery);
            console.log('CREATE GALLERY IS SHOWING GETELEMENT AS: ' + document.getElementById('myModal'));
            console.log('CREATE GALLERY IS SHOWING GETELEMENT AS: ' + JSON.stringify(document.getElementById('myModal')));
            console.log('Create gallery successfull at Admin-Handyman.component');
            _this.addGalleryForm.reset();
            // this.modalService.close(document.getElementById('myModal'));
            _this.readGallerys();
        }, function (error) { return console.log('Create gallery error at Admin-handyman.component. error:  ' + error); });
    };
    AdminHandymanComponent.prototype.clearGalleryForm = function () {
        this.addGalleryForm.reset();
        this.cancelUploaderAll();
    };
    AdminHandymanComponent.prototype.readGallerys = function () {
        var _this = this;
        this.dataService.readGallerys().subscribe(function (data) { return _this.gallerys = data; }, function (error) { return console.log(error); }, function () { return _this.galleryIsLoading = false; });
    };
    AdminHandymanComponent.prototype.enableGalleryEditing = function (gallery) {
        this.galleryIsEditing = true;
        this.gallery = gallery;
    };
    AdminHandymanComponent.prototype.cancelGalleryEditing = function () {
        this.galleryIsEditing = false;
        this.gallery = {};
        this.readGallerys();
    };
    AdminHandymanComponent.prototype.updateGallery = function (gallery) {
        var _this = this;
        if (this.imageName.length > 0) {
            gallery.galleryImage = this.imageName;
            console.log("Gallery Update in Admin, galleryImage is: " + gallery.galleryImage);
        }
        console.log("Past the Gallery Update If statement.");
        this.dataService.updateGallery(gallery).subscribe(function (res) {
            _this.galleryIsEditing = false;
            _this.gallery = gallery;
            console.log('Update gallery successfull at Admin-Handyman.component, gallery:  ' + JSON.stringify(_this.gallery));
            _this.readGallerys();
        }, function (error) { return console.log('Update gallery Failed at Admin-Handyman.component. error: ' + error + "THIS IS THE Gallery:  " + +JSON.stringify(_this.gallery)); });
    };
    AdminHandymanComponent.prototype.deleteGallery = function (gallery) {
        var _this = this;
        if (window.confirm('Are you sure you want to permanently delete this gallery?')) {
            this.dataService.deleteGallery(gallery).subscribe(function (res) {
                console.log('Delete gallery successfull at Admin-Handyman.component.');
                var pos = _this.gallerys.map(function (elem) { return elem._id; }).indexOf(gallery._id);
                // this.gallerys.splice(pos, 1);
                _this.readGallerys();
            }, function (error) { return console.log('Delete gallery Failed at Admin-Handyman.component. error: ' + error); });
        }
    };
    //=====================Service Data Connections==================================
    AdminHandymanComponent.prototype.createService = function () {
        var _this = this;
        this.addServiceForm.value.serviceImage = this.imageName;
        this.dataService.createService(this.addServiceForm.value).subscribe(function (res) {
            var newService = res.json();
            _this.services.push(newService);
            console.log('Create service successfull at Admin-Handyman.component');
            _this.addServiceForm.reset();
            _this.readServices();
        }, function (error) { return console.log('Create error at Admin-handyman.component. error:  ' + error); });
    };
    AdminHandymanComponent.prototype.readServices = function () {
        var _this = this;
        this.dataService.readServices().subscribe(function (data) { return _this.services = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
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
        if (this.imageName.length > 0) {
            service.serviceImage = this.imageName;
        }
        this.dataService.updateService(service).subscribe(function (res) {
            _this.isEditing = false;
            _this.service = service;
            console.log('Update service successfull at Admin-Handyman.component, service:  ' + JSON.stringify(_this.service));
            _this.readServices();
        }, function (error) { return console.log('Update service Failed at Admin-Handyman.component. error: ' + error + "THIS IS THE SERVICE:  " + +JSON.stringify(_this.service)); });
    };
    AdminHandymanComponent.prototype.deleteService = function (service) {
        var _this = this;
        if (window.confirm('Are you sure you want to permanently delete this service?')) {
            this.dataService.deleteService(service).subscribe(function (res) {
                console.log('Delete service successfull at Admin-Handyman.component.');
                var pos = _this.services.map(function (elem) { return elem._id; }).indexOf(service._id);
                _this.services.splice(pos, 1);
                _this.readServices();
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
            _this.readServiceLists();
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
            _this.readServiceLists();
        }, function (error) { return console.log('Update service list Failed at Admin-Handyman.component. error: ' + error + "THIS IS THE SERVICE:  " + +JSON.stringify(_this.serviceList)); });
    };
    AdminHandymanComponent.prototype.deleteServiceList = function (serviceList) {
        var _this = this;
        if (window.confirm('Are you sure you want to permanently delete this service list item?')) {
            this.dataService.deleteServiceList(serviceList).subscribe(function (res) {
                console.log('Delete service list successfull at Admin-Handyman.component.');
                var pos = _this.serviceLists.map(function (elem) { return elem._id; }).indexOf(serviceList._id);
                _this.serviceLists.splice(pos, 1);
                _this.readServiceLists();
            }, function (error) { return console.log('Delete service list Failed at Admin-Handyman.component. error: ' + error); });
        }
    };
    //=====================Review Data Connections==================================
    AdminHandymanComponent.prototype.createReview = function () {
        var _this = this;
        this.addReviewForm.value.reviewImage = this.imageName;
        this.dataService.createReview(this.addReviewForm.value).subscribe(function (res) {
            var newReview = res.json();
            _this.reviews.push(newReview);
            console.log('Create review successfull at Admin-Handyman.component');
            _this.addReviewForm.reset();
            _this.readReviews();
        }, function (error) { return console.log('Create review error at Admin-handyman.component. error:  ' + error); });
    };
    AdminHandymanComponent.prototype.readReviews = function () {
        var _this = this;
        this.dataService.readReviews().subscribe(function (data) { return _this.reviews = data; }, function (error) { return console.log(error); }, function () { return _this.reviewIsLoading = false; });
    };
    AdminHandymanComponent.prototype.enableReviewEditing = function (review) {
        this.reviewIsEditing = true;
        this.review = review;
    };
    AdminHandymanComponent.prototype.cancelReviewEditing = function () {
        this.reviewIsEditing = false;
        this.review = {};
        this.readReviews();
    };
    AdminHandymanComponent.prototype.updateReview = function (review) {
        var _this = this;
        if (this.imageName.length > 0) {
            review.reviewImage = this.imageName;
        }
        this.dataService.updateReview(review).subscribe(function (res) {
            _this.reviewIsEditing = false;
            _this.review = review;
            console.log('Update review successfull at Admin-Handyman.component, review:  ' + JSON.stringify(_this.review));
            _this.readReviews();
        }, function (error) { return console.log('Update review Failed at Admin-Handyman.component. error: ' + error + "THIS IS THE REVIEW:  " + +JSON.stringify(_this.review)); });
    };
    AdminHandymanComponent.prototype.deleteReview = function (review) {
        var _this = this;
        if (window.confirm('Are you sure you want to permanently delete this review?')) {
            this.dataService.deleteReview(review).subscribe(function (res) {
                console.log('Delete review successfull at Admin-Handyman.component.');
                var pos = _this.reviews.map(function (elem) { return elem._id; }).indexOf(review._id);
                _this.reviews.splice(pos, 1);
                _this.readReviews();
            }, function (error) { return console.log('Delete review Failed at Admin-Handyman.component. error: ' + error); });
        }
    };
    //=================FileUploader Functions========================================
    AdminHandymanComponent.prototype.cancelUploaderItem = function (item) {
        for (var i = 0; i < this.uploader.queue.length; i++) {
            var itm = this.uploader.queue[i];
            if (itm = item) {
                itm.remove();
            }
        }
        console.log('File has been cleared from the uploader.queue');
    };
    ;
    AdminHandymanComponent.prototype.cancelUploaderAll = function () {
        this.uploader.clearQueue();
        console.log("Uploader.queue has been cleared.");
    };
    __decorate([
        ViewChild('myModal'),
        __metadata("design:type", ElementRef)
    ], AdminHandymanComponent.prototype, "el", void 0);
    AdminHandymanComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'my-admin',
            templateUrl: 'admin-handyman.component.html',
            styleUrls: [
                '../_styles/admin-handyman.component.css',
                '../_styles/admin-handyman-top_title.component.css',
                '../_styles/admin-handyman-admin_top_gallery.component.css',
                '../_styles/admin-handyman-admin_services.component.css',
                '../_styles/admin-handyman-admin_reviews.component.css',
                '../_styles/uploadImage.component.css',
            ],
        }),
        __metadata("design:paramtypes", [Http,
            Router,
            DataService,
            AuthService,
            MyModalService,
            AppConfig,
            FormBuilder])
    ], AdminHandymanComponent);
    return AdminHandymanComponent;
}());
export { AdminHandymanComponent };
//# sourceMappingURL=admin-handyman.component.js.map