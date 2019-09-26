import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../grid/grid.module';
import {BoardComponent} from './board.component';
import {NewsGadgetComponent} from '../gadgets/news/news-gadget.component';
import {TodoGadgetComponent} from '../gadgets/todo/todo-gadget.component';  // todo gadget
import {LiveCadGadgetComponent} from '../gadgets/liveCad/livecad.gadget.component';
import {MapGadgetComponent} from '../gadgets/map/map.gadget.component';

@NgModule({
    imports: [
     CommonModule,
        GridModule.withComponents([
        NewsGadgetComponent,
        TodoGadgetComponent,  // todo gadget
        LiveCadGadgetComponent,
        MapGadgetComponent
        ]),
    ],
    providers: [],
    declarations: [
        BoardComponent
    ]
})
export class BoardModule {
}
