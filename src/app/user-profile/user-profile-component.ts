/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    AfterViewInit, Component, Output, EventEmitter, Input
} from '@angular/core';

import {environment} from '../../environments/environment';
import {UserProfileService} from './service';


/**
 * Message Modal - clasable modal with message
 *
 * Selector message-modal
 *
 * Methods
 *      popMessageModal - display a message modal for a sepcified duration
 *      showMessageModal - show the message modal
 *      hideMessageModal - hide the message modal
 */
@Component({
    selector: 'app-UserProfile-modal',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css']

})
export class UserProfileComponent implements AfterViewInit {

    modalHeader = 'UserProfile';
    apiVersion: string;

    messageModal: any;
    env: any;

    constructor(private _UserProfileService: UserProfileService) {

        this.env = environment;
    }


    ngAfterViewInit() {

        this.getVersion();

    }

    getVersion() {

        this._UserProfileService.getAPIVersion().subscribe(data => {

            this.apiVersion = data['version'];

        });

    }


}
