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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var datepicker_inner_component_1 = require("./datepicker-inner.component");
var forms_1 = require("@angular/forms");
/* tslint:disable:component-selector-name component-selector-type */
var DatePickerComponent = (function () {
    function DatePickerComponent(cd) {
        this.selectionDone = new core_1.EventEmitter(undefined);
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this._now = new Date();
        this.cd = cd;
        // hack
        cd.valueAccessor = this;
    }
    Object.defineProperty(DatePickerComponent.prototype, "activeDate", {
        get: function () {
            return this._activeDate || this._now;
        },
        set: function (value) {
            this._activeDate = value;
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.onUpdate = function (event) {
        this.cd.viewToModelUpdate(event);
    };
    DatePickerComponent.prototype.onSelectionDone = function (event) {
        this.selectionDone.emit(event);
    };
    // todo: support null value
    DatePickerComponent.prototype.writeValue = function (value) {
        if (this.datePicker.compare(value, this._activeDate) === 0) {
            return;
        }
        if (value && value instanceof Date) {
            this.activeDate = value;
            this.datePicker.select(value);
            return;
        }
        this.activeDate = value ? new Date(value) : void 0;
    };
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return DatePickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "datepickerMode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DatePickerComponent.prototype, "initDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DatePickerComponent.prototype, "minDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DatePickerComponent.prototype, "maxDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "minMode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "maxMode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatePickerComponent.prototype, "showWeeks", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "formatDay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "formatMonth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "formatYear", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "formatDayHeader", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "formatDayTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePickerComponent.prototype, "formatMonthTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatePickerComponent.prototype, "startingDay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatePickerComponent.prototype, "yearRange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatePickerComponent.prototype, "onlyCurrentMonth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatePickerComponent.prototype, "shortcutPropagation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DatePickerComponent.prototype, "customClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "dateDisabled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerComponent.prototype, "selectionDone", void 0);
__decorate([
    core_1.ViewChild(datepicker_inner_component_1.DatePickerInnerComponent),
    __metadata("design:type", datepicker_inner_component_1.DatePickerInnerComponent)
], DatePickerComponent.prototype, "datePicker", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], DatePickerComponent.prototype, "activeDate", null);
DatePickerComponent = __decorate([
    core_1.Component({
        selector: 'datepicker[ngModel]',
        template: "\n    <datepicker-inner [activeDate]=\"activeDate\"\n                      (update)=\"onUpdate($event)\"\n                      [datepickerMode]=\"datepickerMode\"\n                      [initDate]=\"initDate\"\n                      [minDate]=\"minDate\"\n                      [maxDate]=\"maxDate\"\n                      [minMode]=\"minMode\"\n                      [maxMode]=\"maxMode\"\n                      [showWeeks]=\"showWeeks\"\n                      [formatDay]=\"formatDay\"\n                      [formatMonth]=\"formatMonth\"\n                      [formatYear]=\"formatYear\"\n                      [formatDayHeader]=\"formatDayHeader\"\n                      [formatDayTitle]=\"formatDayTitle\"\n                      [formatMonthTitle]=\"formatMonthTitle\"\n                      [startingDay]=\"startingDay\"\n                      [yearRange]=\"yearRange\"\n                      [customClass]=\"customClass\"\n                      [dateDisabled]=\"dateDisabled\"\n                      [onlyCurrentMonth]=\"onlyCurrentMonth\"\n                      [shortcutPropagation]=\"shortcutPropagation\"\n                      (selectionDone)=\"onSelectionDone($event)\">\n      <daypicker tabindex=\"0\"></daypicker>\n      <monthpicker tabindex=\"0\"></monthpicker>\n      <yearpicker tabindex=\"0\"></yearpicker>\n    </datepicker-inner>\n    ",
        providers: [forms_1.NgModel]
    }),
    __param(0, core_1.Self()),
    __metadata("design:paramtypes", [forms_1.NgModel])
], DatePickerComponent);
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.component.js.map