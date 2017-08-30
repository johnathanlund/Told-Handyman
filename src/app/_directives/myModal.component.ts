import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { MyModalService } from '../_services/myModal.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'myModal',
    template: '<ng-content></ng-content>'
})

export class MyModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: JQuery;

    constructor(private myModalService: MyModalService, private el: ElementRef) {
        this.element = $(el.nativeElement);
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        this.element.appendTo('body');

        // close modal on background click
        this.element.on('click', function (e: any) {
            var target = $(e.target);
            if (!target.closest('.myModal-body').length) {
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.myModalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.myModalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.show();
        $('body').addClass('myModal-open');
    }

    // close modal
    close(): void {
        this.element.hide();
        $('body').removeClass('myModal-open');
    }
}
