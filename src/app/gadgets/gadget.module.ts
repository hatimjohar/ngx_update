import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsGadgetComponent} from './news/news-gadget.component';
import {TodoGadgetComponent} from './todo/todo-gadget.component';  // todo gadget
import {DynamicFormModule} from '../dynamic-form/dynamic-form-module';
import {DndModule} from 'ng2-dnd';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GadgetSharedModule} from './_common/gadget-shared.module';
import {ErrorHandlerModule} from '../error/error.module';
import {
    MatButtonModule, MatCheckboxModule, MatExpansionModule, MatIconModule, MatInputModule, MatOptionModule,
    MatProgressBarModule, MatSelectModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';

import {DataListModule} from '../datalist/data-list.module';
import {APITokenService} from '../api-token/api-token.service';
import {FacetModule} from '../facet/facet.module';
import {TypeAheadInputModule} from '../typeahead-input/typeahead-input.module';
import {TodoService} from './todo/service';
import {LiveCadGadgetComponent} from './liveCad/livecad.gadget.component';
import {MapGadgetComponent} from './map/map.gadget.component';

@NgModule({
    'imports': [
        CommonModule,
        GadgetSharedModule,
        DndModule.forRoot(),
        DynamicFormModule,
        ErrorHandlerModule,
        NgxChartsModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        FacetModule,
        TypeAheadInputModule,
        DataListModule
    ],
    'declarations': [
        TodoGadgetComponent,  // todo gadget
         NewsGadgetComponent,
         LiveCadGadgetComponent,
         MapGadgetComponent
    ],

    'providers': [
        APITokenService,
        TodoService,  // todo gadget
    ],

    'exports': [
        TodoGadgetComponent,  // todo gadget
        NewsGadgetComponent,
        LiveCadGadgetComponent,
        MapGadgetComponent
    ]
})
export class GadgetModule {
}
