import { ChangeDetectorRef, Component } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { GadgetInstanceService } from '../../grid/grid.service';
import { EndPointService } from '../../configuration/tab-endpoint/endpoint.service';
import { GadgetPropertyService } from '../_common/gadget-property.service';
import { GadgetBase } from '../_common/gadget-base';
import { LiveCadService } from './service';
import { OptionsService } from '../../configuration/tab-options/service';

@Component({
    'selector': 'app-dynamic-component',
    'moduleId': module.id,
    'templateUrl': './view.html',
    'styleUrls': ['../_common/styles-gadget.css']
})
export class LiveCadGadgetComponent extends GadgetBase {

    // runtime document subscription
    liveCad: any;
    resource: string;
    pandingData: any;

    gadgetHasOperationControls = false;

    constructor(protected _runtimeService: RuntimeService,
        protected _gadgetInstanceService: GadgetInstanceService,
        protected _propertyService: GadgetPropertyService,
        protected _endPointService: EndPointService,
        protected _changeDetectionRef: ChangeDetectorRef,
        protected _LiveCadService: LiveCadService,
        protected _optionsService: OptionsService) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
            _optionsService);

    }

    public preRun(): void {
        this.updateData(null);
        this.run();
    }

    public run() {
        this.liveCad = [];
        this.initializeRunState(true);
        this.updateData(null);
    }

    public stop() {
        this.setStopState(false);
    }

    public updateData(data: any[]) {
        this._LiveCadService.get().subscribe((liveCad) => {
            this.liveCad = liveCad;
            this.pandingData =  this.liveCad[0].liveCADData.features.filter((feature) => feature.attributes['Status'] === 'Pending');
        },
            (error) => this.handleError(error));
    }

    public updateProperties(updatedProperties: any) {
        /*
         * todo
         *  A similar operation exists on the procmman-config-service
         *  whenever the property page form is saved, the in memory board model
         *  is updated as well as the gadget instance properties
         *  which is what the code below does. This can be eliminated with code added to the
         *  config service or the property page service.
         *
         *
         */

        const updatedPropsObject = JSON.parse(updatedProperties);

        this.propertyPages.forEach(function (propertyPage) {
            for (let x = 0; x < propertyPage.properties.length; x++) {
                for (const prop in updatedPropsObject) {
                    if (updatedPropsObject.hasOwnProperty(prop)) {
                        if (prop === propertyPage.properties[x].key) {
                            propertyPage.properties[x].value = updatedPropsObject[prop];
                        }

                    }
                }
            }
        });

        this.title = updatedPropsObject.title;
        this.setEndPoint(updatedPropsObject.endpoint);
        this.updateData(null);
    }
}
