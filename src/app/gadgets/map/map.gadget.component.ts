import { ChangeDetectorRef, Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { GadgetInstanceService } from '../../grid/grid.service';
import { EndPointService } from '../../configuration/tab-endpoint/endpoint.service';
import { GadgetPropertyService } from '../_common/gadget-property.service';
import { GadgetBase } from '../_common/gadget-base';
import { MapService } from './service';
import { OptionsService } from '../../configuration/tab-options/service';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-dynamic-component',
  moduleId: module.id,
  templateUrl: './view.html',
  styleUrls: ['../_common/styles-gadget.css']
})
export class MapGadgetComponent extends GadgetBase {

  // runtime document subscription
  mapview: any;
  resource: string;
  private _zoom = 13;
  private _center = [-77.03637, 38.89511];
  private _basemap = 'streets-night-vector';
  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: any[]) {
    this._center = center;
  }

  get center(): any[] {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }
  @Output() mapLoaded = new EventEmitter<boolean>();
  contentDiv = false;
  // this is needed to be able to create the MapView at the DOM element in this component
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  gadgetHasOperationControls = false;

  constructor(protected _runtimeService: RuntimeService,
    protected _gadgetInstanceService: GadgetInstanceService,
    protected _propertyService: GadgetPropertyService,
    protected _endPointService: EndPointService,
    protected _changeDetectionRef: ChangeDetectorRef,
    protected _MapService: MapService,
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
    this.mapview = [];
    this.initializeRunState(true);
    this.updateData(null);
  }

  public stop() {
    this.setStopState(false);
  }

  public updateData(data: any[]) {

    this._MapService.get().subscribe(mapview => {
      this.mapview = mapview;
    },
      error => this.handleError(error));
  }

  public updateProperties(updatedProperties: any) {

    /**
     * todo
     *  A similar operation exists on the procmman-config-service
     *  whenever the property page form is saved, the in memory board model
     *  is updated as well as the gadget instance properties
     *  which is what the code below does. This can be eliminated with code added to the
     *  config service or the property page service.
     *
     * **/

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
  public ngOnInit() {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      //   'esri/widgets/Locate',
      'esri/layers/FeatureLayer',
      'esri/widgets/LayerList',
      'esri/widgets/Home',
      'esri/widgets/BasemapGallery',
      'esri/widgets/Expand'
    ])
      .then(([
        EsriMap,
        EsriMapView,
        //    EsriLocate,
        EsriFeatureLayer,
        EsriLayerList,
        EsriHome,
        BasemapGallery,
        EsriExpand
      ]) => {
        // Set type for Map constructor properties
        const mapProperties: esri.MapProperties = {
          'basemap': this._basemap
        };
        const map: esri.Map = new EsriMap(mapProperties);
        // Set type for MapView constructor properties
        const mapViewProperties: esri.MapViewProperties = {
          'container': this.mapViewEl.nativeElement,
          'center': this._center,
         'zoom': this._zoom,
         'map': map
        };
        const featureLayer: esri.FeatureLayer = new EsriFeatureLayer({
          'url':
            'https://services5.arcgis.com/cMBqYE4wmbXNMvex/arcgis/rest/services/All_Incidents/FeatureServer/1',
          //  popupTemplate: pTemplate,
        });
        // map.add(featureLayer);
        const mapView: esri.MapView = new EsriMapView(mapViewProperties);
        const basemapProperties: any = {
          'position': 'top-right'
        };
        const homeBtn: any = new EsriHome({
          'view': mapView
        });
        // Add the home button to the top left corner of the view
        mapView.ui.add(homeBtn, 'top-left');
        // const locateBtn: any = new EsriLocate({
        //   view: mapView
        // });
        const locateBtnProperties: any = { 'position': 'top-left' };
        // Add the locate widget to the top left corner of the view
        mapView.ui.add(locateBtnProperties);

        const basemapGallery: esri.BasemapGallery = new BasemapGallery({
          'view': mapView,
          'container': document.createElement('div', this.mapViewEl.nativeElement)
        });

        const basemapExpand = new EsriExpand({
          'view': mapView,
          'expandTooltip': 'Expand Basemap',
          'collapseTooltip': 'Collapse Basemap',
          'content': basemapGallery.container,
          'expandIconClass': 'esri-icon-basemap'
        });
        mapView.ui.add(basemapExpand, basemapProperties);
        mapView.on('click', function (event) {
          // debugger;
          // console.log('click event: ', event.mapPoint);
        });
        mapView.when(() => {
          // All the resources in the MapView and the map have loaded. Now execute additional processes
          this.mapLoaded.emit(true);
        }, (err) => {
          console.error(err);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
