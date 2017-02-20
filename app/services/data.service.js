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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
// Does this line below work without angular-cli?
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this._adminUrl = 'http://localhost:8000';
    }
    DataService.prototype.createService = function (service) {
        console.log("Create service successfull at data.service");
        return this.http.post('http://localhost:8000/service', JSON.stringify(service), this.options);
    };
    DataService.prototype.readServices = function () {
        console.log("Starting to Read service successfull at data.service");
        return this.http.get('http://localhost:8000/services').map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server Error'); });
        // console.log('Read read please reeeeeaaaaaad.....');
    };
    DataService.prototype.updateService = function (service) {
        console.log("Update service successfull at data.service");
        return this.http.put('http://localhost:8000/service/' + service._id, JSON.stringify(service), this.options);
    };
    DataService.prototype.deleteService = function (service) {
        console.log("Delete service successfull at data.service");
        return this.http.delete('http://localhost:8000/service/' + service._id, this.options);
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map