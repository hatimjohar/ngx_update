import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Created by jayhamilton on 6/29/17.
 */

@Component({
    moduleId: module.id,
    selector: 'app-gadget-operation-control',
    template: `

        <button class="compact ui button right floated"
                *ngIf="!inRun && !actionInitiated && showOperationControls && gadgetHasOperationControls"
                (click)="run()"><em class="green play icon" style="margin-right:0 !important"></em>
        </button>

        <button class="compact ui button right floated"
                *ngIf="!inRun && 
        actionInitiated && 
        showOperationControls && 
        gadgetHasOperationControls">
            <em class="black spinner loading icon" style="margin-right:0 !important"></em>
        </button>

        <button class="compact ui button right floated"
                *ngIf="inRun && !actionInitiated && showOperationControls && gadgetHasOperationControls"
                (click)="stop()"><em class="red stop icon" style="margin-right:0 !important"></em>
        </button>
    `,
})
export class GadgetOperationComponent {
    @Output() runEvent: EventEmitter<any> = new EventEmitter();
    @Output() stopEvent: EventEmitter<any> = new EventEmitter();

    @Input() inRun: boolean;
    @Input() actionInitiated: boolean;
    @Input() inConfig: boolean;
    @Input() showOperationControls: boolean;
    @Input() gadgetHasOperationControls: boolean;


    run() {
        this.runEvent.emit();
    }

    stop() {
        this.stopEvent.emit();
    }

}
