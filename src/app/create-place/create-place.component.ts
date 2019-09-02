import { Component, OnInit, NgZone, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MapsAPILoader } from '@agm/core';
import { PlaceDataService } from '@app/shared/placeData.service';
import { PlacesService } from '@app/places.service';
import { PlacesphotoService } from '@app/placesphoto.service';
import { map, tap, flatMap, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.scss']
})
export class CreatePlaceComponent implements OnInit {
  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;
  placeName: string;
  placeCountry: string;
  placeRegion: string;
  placeVisited: string;
  placePhotos: string[];
  placePhotosTest = ['a', 'b', 'c'];

  constructor(
    public dialogRef: MatDialogRef<CreatePlaceComponent>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private placeDataService: PlaceDataService,
    private placeService: PlacesService,
    private placesphotoService: PlacesphotoService
  ) {}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.placesphotoService.query = this.placeName;

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.placeService.initializeForm();
          this.placeDataService.setPlaceData(place);
          this.placeDataService.placeData.subscribe(value => {
            this.placeName = value.name;
            this.placeRegion = value.address_components[value.address_components.length - 2].long_name;
            this.placeCountry = value.address_components[value.address_components.length - 1].long_name;
            this.placeService.form.get('placeName').setValue(this.placeName);
            this.placeService.form.get('placeRegion').setValue(this.placeRegion);
            this.placeService.form.get('placeCountry').setValue(this.placeCountry);
            if (this.placesphotoService.query !== '' ){
              this.placesphotoService.query = this.placeName;
            this.getPlacephoto();
            console.log(this.placePhotos);
          }
          });
        });
      });
      if (this.placesphotoService.query !== '' ){
      this.getPlacephoto();
    }
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.placeService.insertPlace(this.placeService.form.value);
    this.placeService.form.reset();
    this.onClose();
  }

  onClear() {
    this.searchElementRef.nativeElement.value = '';
  }

  getPlacephoto(){
    this.placesphotoService.getPlacephoto().pipe(
      tap ((element) => console.log(element)),
      map (value => value.results.map((el:any) => ({pictureUrl: el.urls.small, pictureText: el.description })))
    )
    .subscribe(
      (pictureUrl) => this.placePhotos = pictureUrl
    )
  }
}
