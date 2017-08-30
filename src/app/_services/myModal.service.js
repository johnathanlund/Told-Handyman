"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var MyModalService = (function () {
    function MyModalService() {
        this.modals = [];
    }
    MyModalService.prototype.add = function (modal) {
        // add modal to array of active modals
        this.modals.push(modal);
    };
    MyModalService.prototype.remove = function (id) {
        // remove modal from array of active modals
        var modalToRemove = _.findWhere(this.modals, { id: id });
        this.modals = _.without(this.modals, modalToRemove);
    };
    MyModalService.prototype.open = function (id) {
        // open modal specified by id
        var modal = _.findWhere(this.modals, { id: id });
        modal.open();
    };
    MyModalService.prototype.close = function (id) {
        // close modal specified by id
        var modal = _.find(this.modals, { id: id });
        modal.close();
    };
    return MyModalService;
}());
exports.MyModalService = MyModalService;
//# sourceMappingURL=myModal.service.js.map