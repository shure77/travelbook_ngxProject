import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '@app/models/place';
import { PlacesService } from '@app/places.service';
import { SearchDataService } from '@app/shared/searchData.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnDestroy {
  places: Place[];
  searchText: string;
  subscription: Subscription;

  constructor(private placesService: PlacesService,
              private searchTextService: SearchDataService) {}

  ngOnInit() {
    this.places = this.placesService.getPlaces();
    this.subscription = this.searchTextService.currentSearchData.subscribe((searchText) => this.searchText = searchText);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
