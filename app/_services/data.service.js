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
var http_1 = require("@angular/http");
var app_config_1 = require("../app.config");
var Rx_1 = require("rxjs/Rx");
// Does this line below work without angular-cli?
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DataService = (function () {
    function DataService(http, config) {
        this.http = http;
        this.config = config;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    //=============User Login Connections==========================================
    // login(user): Observable<any> {
    //   console.log("Login successfull at data.service");
    //   return this.http.post('http://localhost:8000/login', JSON.stringify(user), this.options);
    //   return this.http.post('http://localhost:8000/getCurrentUser', JSON.stringify(user), this.options)
    //   .map((res:Response) => res.json());
    // }
    //=============Contact Form Connections========================================
    DataService.prototype.createContactForm = function (contact) {
        console.log("Create contact form successfull at data.service");
        return this.http.post(this.config.apiUrl + '/contactForm', JSON.stringify(contact), this.options);
    };
    //=============Gallery Connections=============================================
    DataService.prototype.createGallery = function (gallery) {
        console.log("Create gallery successfull at data.service");
        return this.http.post(this.config.apiUrl + '/gallery', JSON.stringify(gallery), this.options);
    };
    DataService.prototype.readGallerys = function () {
        console.log("Starting to Read gallery successfull at data.service");
        return this.http.get(this.config.apiUrl + '/gallerys').timeout(2000).map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server Error'); });
    };
    DataService.prototype.updateGallery = function (gallery) {
        console.log("Update gallery successfull at data.service");
        return this.http.put(this.config.apiUrl + '/gallery/' + gallery._id, JSON.stringify(gallery), this.options);
    };
    DataService.prototype.deleteGallery = function (gallery) {
        console.log("Delete gallery successfull at data.service");
        return this.http.delete(this.config.apiUrl + '/gallery/' + gallery._id, this.options);
    };
    //=============Service Connections=============================================
    DataService.prototype.createService = function (service) {
        console.log("Create service successfull at data.service");
        return this.http.post(this.config.apiUrl + '/service', JSON.stringify(service), this.options);
    };
    DataService.prototype.readServices = function () {
        console.log("Starting to Read service successfull at data.service");
        return this.http.get(this.config.apiUrl + '/services').timeout(2000).map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server Error'); });
        // console.log('Read read please reeeeeaaaaaad.....');
    };
    DataService.prototype.updateService = function (service) {
        console.log("Update service successfull at data.service");
        return this.http.put(this.config.apiUrl + '/service/' + service._id, JSON.stringify(service), this.options);
    };
    DataService.prototype.deleteService = function (service) {
        console.log("Delete service successfull at data.service");
        return this.http.delete(this.config.apiUrl + '/service/' + service._id, this.options);
    };
    //==============Service List Connections=======================================
    DataService.prototype.createServiceList = function (serviceList) {
        console.log("Create service list successfull at data.service");
        return this.http.post(this.config.apiUrl + '/serviceList', JSON.stringify(serviceList), this.options);
    };
    DataService.prototype.readServiceLists = function () {
        console.log("Starting to Read service list successfull at data.service");
        return this.http.get(this.config.apiUrl + '/serviceLists').map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server Error'); });
        // console.log('Read read please reeeeeaaaaaad.....');
    };
    DataService.prototype.updateServiceList = function (serviceList) {
        console.log("Update service list successfull at data.service");
        return this.http.put(this.config.apiUrl + '/serviceList/' + serviceList._id, JSON.stringify(serviceList), this.options);
    };
    DataService.prototype.deleteServiceList = function (serviceList) {
        console.log("Delete service list successfull at data.service");
        return this.http.delete(this.config.apiUrl + '/serviceList/' + serviceList._id, this.options);
    };
    //=============Review Connections=============================================
    DataService.prototype.createReview = function (review) {
        console.log("Create review successfull at data.service");
        return this.http.post(this.config.apiUrl + '/review', JSON.stringify(review), this.options);
    };
    DataService.prototype.readReviews = function () {
        console.log("Starting to Read review successfull at data.service");
        return this.http.get(this.config.apiUrl + '/reviews').timeout(2000).map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server Error'); });
        // console.log('Read read please reeeeeaaaaaad.....');
    };
    DataService.prototype.updateReview = function (review) {
        console.log("Update review successfull at data.service");
        return this.http.put(this.config.apiUrl + '/review/' + review._id, JSON.stringify(review), this.options);
    };
    DataService.prototype.deleteReview = function (review) {
        console.log("Delete review successfull at data.service");
        return this.http.delete(this.config.apiUrl + '/review/' + review._id, this.options);
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map