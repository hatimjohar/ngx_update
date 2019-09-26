/**
 * Created by jayhamilton on 2/28/17.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
/**
 * Created by jayhamilton on 2/26/17.
 */

@Component({
    moduleId: module.id,
    selector: 'app-gadget-header',
    templateUrl: './gadget-header.html',
    styleUrls: ['./styles-gadget.css']
})
export class GadgetHeaderComponent {
    @Input() title: string;
    @Input() showControls: boolean;
    @Input() inRun: boolean;
    @Input() inConfig: boolean;
    @Input() actionInitiated: boolean;
    @Input() showOperationControls: boolean;
    @Input() showConfigurationControl: boolean;
    @Input() gadgetHasOperationControls: boolean;
    @Input() showfullScreen: boolean;
    @Input() globalOptions: any;
    @Output() removeEvent: EventEmitter<any> = new EventEmitter();
    @Output() toggleConfigModeEvent: EventEmitter<any> = new EventEmitter();
    @Output() runEvent: EventEmitter<any> = new EventEmitter();
    @Output() stopEvent: EventEmitter<any> = new EventEmitter();
    @Output() helpEvent: EventEmitter<any> = new EventEmitter();
    public isfullScreen;
    public maximizeIcon: Boolean = true;
    public restoreIcon: Boolean = false;
    remove() {
        this.removeEvent.emit();
    }

    toggleConfigMode() {
        this.toggleConfigModeEvent.emit();
    }

    run() {

        this.runEvent.emit();

    }

    stop() {

        this.stopEvent.emit();
    }

    help() {
        this.helpEvent.emit();
    }
   
    toggleFullScreen(id) {
        let elm = id.target.parentNode;
        do
        {
            elm = elm.parentNode; 
        }while(elm.classList.contains("gadget") == false);
        
            this.isfullScreen = !this.isfullScreen;
            if (this.isfullScreen) {
            this.maximizeIcon = false;
            this.restoreIcon = true;
            document.getElementById(elm.id).classList.add('fullScreeenWidget');
        
        } else {
            this.maximizeIcon = true;
            this.restoreIcon = false;
            document.getElementById(elm.id).classList.remove('fullScreeenWidget');
        }
     }

}
