import { Injectable } from '@angular/core';
import { Place } from './models/place';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  placesList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getPlacesFb() {
    this.placesList = this.firebase.list('places');
    return this.placesList.snapshotChanges(); // returns an observable
  }

  // insertPlace(place: any) {
  //   this.placesList.push({
  //     placeName: place.placeName,
  //     placeRegion: place.placeRegion,
  //     placeCountry: place.placeCountry,
  //     placeVisited: place.placeVisited,
  //     placeImageUrl: place.placeImageUrl
  //   });
  // }

  // updatePlace(place: any) {
  //   this.placesList.update(place.$key, 
  //     {
  //       placeName: place.placeName,
  //       placeRegion: place.placeRegion,
  //       placeCountry: place.placeCountry,
  //       placeVisited: place.placeVisited,
  //       placeImageUrl: place.placeImageUrl 
  //     });
  // }

  // deletePlace($key: string) {
  //   this.placesList.remove($key);
  // }
}
