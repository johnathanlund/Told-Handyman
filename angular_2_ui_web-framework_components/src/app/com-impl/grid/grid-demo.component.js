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
// webpack html imports
var template = require('./grid-demo.component.html');
var GridDemoComponent = (function () {
    function GridDemoComponent() {
        this.boxes = [];
        this.rgb = '#efefef';
        this.curNum = 5;
        this.gridConfig = {
            'margins': [5],
            'draggable': true,
            'resizable': true,
            'max_cols': 0,
            'max_rows': 0,
            'visible_cols': 0,
            'visible_rows': 0,
            'min_cols': 1,
            'min_rows': 1,
            'col_width': 2,
            'row_height': 2,
            'cascade': 'up',
            'min_width': 50,
            'min_height': 50,
            'fix_to_grid': false,
            'auto_style': true,
            'auto_resize': false,
            'maintain_ratio': false,
            'prefer_new': false,
            'zoom_on_drag': false,
            'limit_to_screen': true
        };
        this.curItemCheck = 0;
        this.itemPositions = [];
        for (var i = 0; i < 4; i++) {
            var conf = this._generateDefaultItemConfig();
            conf.payload = 1 + i;
            this.boxes[i] = { id: i + 1, config: conf };
        }
    }
    Object.defineProperty(GridDemoComponent.prototype, "ratioDisabled", {
        get: function () {
            return (this.gridConfig.max_rows > 0 && this.gridConfig.visible_cols > 0) ||
                (this.gridConfig.max_cols > 0 && this.gridConfig.visible_rows > 0) ||
                (this.gridConfig.visible_cols > 0 && this.gridConfig.visible_rows > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridDemoComponent.prototype, "itemCheck", {
        get: function () {
            return this.curItemCheck;
        },
        set: function (v) {
            console.log(v);
            this.curItemCheck = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridDemoComponent.prototype, "curItem", {
        get: function () {
            return this.boxes[this.curItemCheck] ? this.boxes[this.curItemCheck].config : {};
        },
        enumerable: true,
        configurable: true
    });
    GridDemoComponent.prototype.addBox = function () {
        var conf = this._generateDefaultItemConfig();
        conf.payload = this.curNum++;
        this.boxes.push({ id: conf.payload, config: conf });
    };
    GridDemoComponent.prototype.removeBox = function () {
        if (this.boxes[this.curItemCheck]) {
            this.boxes.splice(this.curItemCheck, 1);
        }
    };
    GridDemoComponent.prototype.updateItem = function (index, event) {
        // Do something here
    };
    GridDemoComponent.prototype.onDrag = function (index, event) {
        // Do something here
    };
    GridDemoComponent.prototype.onResize = function (index, event) {
        // Do something here
    };
    GridDemoComponent.prototype._generateDefaultItemConfig = function () {
        return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': 1, 'sizey': 1 };
    };
    GridDemoComponent.prototype._randomise = function () {
        for (var x in this.boxes) {
            this.boxes[x].config.col = Math.floor(Math.random() * 6) + 1;
            this.boxes[x].config.row = 1;
        }
    };
    return GridDemoComponent;
}());
GridDemoComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: template,
        styleUrls: ['./grid-demo.component.css']
    }),
    __metadata("design:paramtypes", [])
], GridDemoComponent);
exports.GridDemoComponent = GridDemoComponent;
//# sourceMappingURL=grid-demo.component.js.map