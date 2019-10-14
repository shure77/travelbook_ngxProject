import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '@app/models/place';
import { PlacesService } from '@app/places.service';
import { SearchDataService } from '@app/shared/searchData.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { PlaceState } from '@app/core/store/state/place.state';
import { DeletePlace } from '@app/core/store/actions/place.action';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnDestroy {
  @Select(PlaceState.getPlaces) public places$: Observable<Place[]>;
  places: Place[];
  searchText: string;
  subscription: Subscription;

  constructor(private placesService: PlacesService, private searchTextService: SearchDataService, private  store: Store) {}

  ngOnInit() {
    this.subscription = this.searchTextService.currentSearchData.subscribe(
      searchText => (this.searchText = searchText)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

  onDelete($key: any) {
    this.placesService.deletePlace($key);
    this.store.dispatch(new DeletePlace($key));
  }
}
