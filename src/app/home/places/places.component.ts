import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '@app/models/place';
import { PlacesService } from '@app/places.service';
import { SearchDataService } from '@app/shared/searchData.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnDestroy {
  places: Place[];
  searchText: string;
  subscription: Subscription;

  constructor(private placesService: PlacesService, private searchTextService: SearchDataService) {}

  ngOnInit() {
    this.placesService.getPlacesFb()
      .pipe(
        map(list => list.map((val) => ({$key: val.key, ...val.payload.val()}))), // create objects from firebaseList
        map(unsortedList => unsortedList.sort(
          (a,b) => {
            const c = new Date(a.placeVisited).getTime();
            const d = new Date(b.placeVisited).getTime();
            return d - c;
          }
        )) // sort the list by time visited
        )
      .subscribe(sortedList => this.places = sortedList);
    this.subscription = this.searchTextService.currentSearchData.subscribe(
      searchText => (this.searchText = searchText)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

  onDelete($key: any){
    this.placesService.deletePlace($key);
  }
}
