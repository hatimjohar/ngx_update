import { NewsGadgetComponent } from '../gadgets/news/news-gadget.component';
import { TodoGadgetComponent } from '../gadgets/todo/todo-gadget.component';
import { LiveCadGadgetComponent } from '../gadgets/liveCad/livecad.gadget.component';
import { MapGadgetComponent } from '../gadgets/map/map.gadget.component';

/**
 * Created by jayhamilton on 6/30/17.
 */

export class GadgetFactory {
  /**
   * todo - return new instances  instead of the same instance. This requires the creation of new configuration options.
   * @param gadgetType
   * @returns {any}
   */

  static getComponentType(gadgetType): any {
    switch (gadgetType) {
      case "NewsGadgetComponent":
        return NewsGadgetComponent;
      case "TodoGadgetComponent": // todo gadget
        return TodoGadgetComponent;
      case "LiveCadGadgetComponent":
        return LiveCadGadgetComponent;
      case "MapGadgetComponent":
        return MapGadgetComponent;

      default:
        return null; // todo add default gadget that would be displayed. Useful for troubleshooting new gadget dev
    }
  }
}
