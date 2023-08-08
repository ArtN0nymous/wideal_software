import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var mapboxgl:any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {

  @Input() coords:string='';
  @ViewChild('mapa',{static: true}) mapa!:ElementRef;
  constructor() { }

  ngOnInit() {
    const coords = this.coords.split(',');
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtc3VzIiwiYSI6ImNsZ2R3eHFmOTEyYmUzZ256cGt2MDhzanAifQ.Cvj1IoUhcQOe7zP7UAcPPg';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      center:[Number(coords[1]),Number(coords[0])],
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom:15,
    });
    const marker = new mapboxgl.Marker().setLngLat([Number(coords[1]),Number(coords[0])]).addTo(map);
  }

}
