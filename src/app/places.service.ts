import { Injectable } from '@angular/core';
import { Place } from './models/place';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  placesList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    placeName: new FormControl("", Validators.required),
    placeRegion: new FormControl(""),
    placeCountry: new FormControl("", Validators.required),
    placeVisited: new FormControl(""),
    placeImageUrl: new FormControl(""),
    placeNotes: new FormControl("")
  });

  initializeForm() {
    this.form.setValue({
      $key: null,
      placeName: '',
      placeRegion: '',
      placeCountry: '',
      placeVisited: '',
      placeImageUrl: '',
      placeNotes: ''
    }
    )
  }

  constructor(private firebase: AngularFireDatabase) { }

  getPlacesFb() {
    this.placesList = this.firebase.list('places');
    return this.placesList.snapshotChanges(); // returns an observable
  }

  insertPlace(place: Place) {
    this.placesList.push({
      placeName: place.placeName,
      placeRegion: place.placeRegion,
      placeCountry: place.placeCountry,
      placeVisited: place.placeVisited.toString() ,
      placeImageUrl: place.placeImageUrl,
      placeNotes: place.placeNotes
    });
  }

  // updatePlace(place: any) {
  //   this.placesList.update(place.$key, 
  //     {
  //     placeName: place.placeName,
  //     placeRegion: place.placeRegion,
  //     placeCountry: place.placeCountry,
  //     placeVisited: place.placeVisited.toString(),
  //     placeImageUrl: place.placeImageUrl,
  //     placeNotes: place.placeNotes
  //     });
  // }

  deletePlace($key: string) {
    this.placesList.remove($key);
  }
}
