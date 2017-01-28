import { Component } from '@angular/core';

@Component({
  selector: 'googlemaps-root',
  templateUrl: 'googlemaps-demo.component.html',
  styleUrls: ['googlemaps-demo.component.css'],
})
export class GoogleMapsDemoComponent {
  title: string = 'My first angular 2 google maps example';
  lat: number = 51.678418;
  lng: number = 7.809007;
}

