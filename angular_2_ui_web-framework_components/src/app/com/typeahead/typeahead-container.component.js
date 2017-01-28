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
//import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../ng2-bootstrap-config';
var position_1 = require("../position");
var typeahead_options_class_1 = require("./typeahead-options.class");
var typeahead_utils_1 = require("./typeahead-utils");
var bs3 = "\n  <ul class=\"dropdown-menu\"\n      style=\"display: block\"\n      [ngStyle]=\"{top: top, left: left, display: display}\"\n      (mouseleave)=\"focusLost()\">\n    <li *ngFor=\"let match of matches; let i = index\"\n        [class.active]=\"isActive(match)\"\n        (mouseenter)=\"selectActive(match)\">\n        <a href=\"#\" \n           *ngIf=\"!itemTemplate\" \n           (click)=\"selectMatch(match, $event)\" \n           tabindex=\"-1\" \n           [innerHtml]=\"hightlight(match, query)\"></a>\n        <a href=\"#\" \n           *ngIf=\"itemTemplate\" \n           (click)=\"selectMatch(match, $event)\" \n           tabindex=\"-1\">\n            <template [ngTemplateOutlet]=\"itemTemplate\"\n                      [ngOutletContext]=\"{item: match, index: i}\">\n            </template>\n        </a>\n    </li>\n  </ul>\n";
var TypeaheadContainerComponent = (function () {
    function TypeaheadContainerComponent(element, options) {
        this.isFocused = false;
        this._matches = [];
        this.element = element;
        Object.assign(this, options);
    }
    Object.defineProperty(TypeaheadContainerComponent.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        set: function (value) {
            this._matches = value;
            if (this._matches.length > 0) {
                this._active = this._matches[0];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "itemTemplate", {
        get: function () {
            return this.parent ? this.parent.typeaheadItemTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "field", {
        set: function (value) {
            this._field = value;
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadContainerComponent.prototype.position = function (hostEl) {
        this.display = 'block';
        this.top = '0px';
        this.left = '0px';
        var p = position_1.positionService
            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
        this.top = p.top + 'px';
        this.left = p.left + 'px';
    };
    TypeaheadContainerComponent.prototype.selectActiveMatch = function () {
        this.selectMatch(this._active);
    };
    TypeaheadContainerComponent.prototype.prevActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index - 1 < 0
            ? this.matches.length - 1
            : index - 1];
    };
    TypeaheadContainerComponent.prototype.nextActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1
            ? 0
            : index + 1];
    };
    TypeaheadContainerComponent.prototype.selectActive = function (value) {
        this.isFocused = true;
        this._active = value;
    };
    TypeaheadContainerComponent.prototype.hightlight = function (item, query) {
        var itemStr = typeahead_utils_1.TypeaheadUtils.getValueFromObject(item, this._field);
        var itemStrHelper = (this.parent.typeaheadLatinize
            ? typeahead_utils_1.TypeaheadUtils.latinize(itemStr)
            : itemStr).toLowerCase();
        var startIdx;
        var tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            var queryLen = query.length;
            for (var i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
                    itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
            }
        }
        return itemStr;
    };
    TypeaheadContainerComponent.prototype.focusLost = function () {
        this.isFocused = false;
    };
    TypeaheadContainerComponent.prototype.isActive = function (value) {
        return this._active === value;
    };
    TypeaheadContainerComponent.prototype.selectMatch = function (value, e) {
        var _this = this;
        if (e === void 0) { e = void 0; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout(function () {
            return _this.parent.typeaheadOnSelect.emit({
                item: value
            });
        }, 0);
        return false;
    };
    return TypeaheadContainerComponent;
}());
TypeaheadContainerComponent = __decorate([
    core_1.Component({
        selector: 'typeahead-container',
        template: bs3,
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, typeahead_options_class_1.TypeaheadOptions])
], TypeaheadContainerComponent);
exports.TypeaheadContainerComponent = TypeaheadContainerComponent;
//# sourceMappingURL=typeahead-container.component.js.map