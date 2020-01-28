import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  @Input('lat') lat;
  @Input('lng') lng;
  map: google.maps.Map;
  // lat = 40.730610;
  // lng = -73.935242;
  coordinates;
  mapOptions: google.maps.MapOptions;
  marker;

  ngOnInit() {
    console.log(this.lat);
    console.log(this.lng);
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.mapInitializer();

  }

  mapInitializer() {
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = {
      center: this.coordinates,
      zoom: 8,
    };
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });
    this.marker.setMap(this.map);
  }
}
