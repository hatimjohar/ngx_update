import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GridComponent} from './grid.component';
import {CellComponent} from './cell.component';
import {GadgetInstanceService} from './grid.service';
import {ConfigurationService} from '../services/configuration.service';
import {AddGadgetService} from '../add-gadget/service';
import {DndModule} from 'ng2-dnd';
import {NewsService} from '../gadgets/news/service';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from '../gadgets/todo/service';
import {ToastModule} from '../toast/toast.module';
import {LiveCadService} from '../gadgets/liveCad/service';
import {MapService} from '../gadgets/map/service';

@NgModule({
    'imports': [
    CommonModule,
        FormsModule,
        ToastModule,
        HttpClientModule, DndModule.forRoot()
    ],
    'declarations': [
        GridComponent,
        CellComponent
    ],
    'exports': [
        GridComponent
    ],
    'providers': [
        GadgetInstanceService,
        ConfigurationService,
        AddGadgetService,
        NewsService,
        TodoService,  // todo gadget
        LiveCadService,
        MapService
    ]
})
export class GridModule {
    static withComponents(components: any[]) {
        return {
            ngModule: GridModule,
            providers: [
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
            ]
        };
    }
}
