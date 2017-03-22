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
var $ = require("jquery");
var myModal_service_1 = require("../_services/myModal.service");
var MyModalComponent = (function () {
    function MyModalComponent(myModalService, el) {
        this.myModalService = myModalService;
        this.el = el;
        this.element = $(el.nativeElement);
    }
    MyModalComponent.prototype.ngOnInit = function () {
        var modal = this;
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        this.element.appendTo('body');
        // close modal on background click
        this.element.on('click', function (e) {
            var target = $(e.target);
            if (!target.closest('.myModal-body').length) {
                modal.close();
            }
        });
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.myModalService.add(this);
    };
    // remove self from modal service when directive is destroyed
    MyModalComponent.prototype.ngOnDestroy = function () {
        this.myModalService.remove(this.id);
        this.element.remove();
    };
    // open modal
    MyModalComponent.prototype.open = function () {
        this.element.show();
        $('body').addClass('myModal-open');
    };
    // close modal
    MyModalComponent.prototype.close = function () {
        this.element.hide();
        $('body').removeClass('myModal-open');
    };
    return MyModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MyModalComponent.prototype, "id", void 0);
MyModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'myModal',
        template: '<ng-content></ng-content>'
    }),
    __metadata("design:paramtypes", [myModal_service_1.MyModalService, core_1.ElementRef])
], MyModalComponent);
exports.MyModalComponent = MyModalComponent;
//# sourceMappingURL=myModal.component.js.map