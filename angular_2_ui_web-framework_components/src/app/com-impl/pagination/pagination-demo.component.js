"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// webpack html imports
var template = require('./pagination-demo.component.html');
var PaginationDemoComponent = (function () {
    function PaginationDemoComponent() {
        this.totalItems = 64;
        this.currentPage = 4;
        this.maxSize = 5;
        this.bigTotalItems = 175;
        this.bigCurrentPage = 1;
    }
    PaginationDemoComponent.prototype.setPage = function (pageNo) {
        this.currentPage = pageNo;
    };
    ;
    PaginationDemoComponent.prototype.pageChanged = function (event) {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    };
    ;
    return PaginationDemoComponent;
}());
PaginationDemoComponent = __decorate([
    core_1.Component({
        selector: 'pagination-demo',
        template: template
    })
], PaginationDemoComponent);
exports.PaginationDemoComponent = PaginationDemoComponent;
//# sourceMappingURL=pagination-demo.component.js.map