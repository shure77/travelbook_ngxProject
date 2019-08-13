import { Component, OnInit } from '@angular/core';
import { Place } from '@app/models/place';
import { PlacesService } from '@app/places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  places: Place[];

  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.places = this.placesService.getPlaces();
    console.log(this.places);
  }


}
