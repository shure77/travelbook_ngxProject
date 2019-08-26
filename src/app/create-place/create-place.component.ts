import { Component, OnInit, NgZone, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MapsAPILoader } from '@agm/core';
import { PlaceDataService } from '@app/shared/placeData.service';
import { PlacesService } from '@app/places.service';

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

  constructor(
    public dialogRef: MatDialogRef<CreatePlaceComponent>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private placeDataService: PlaceDataService,
    private placeService: PlacesService
  ) {}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

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
          });
        });
      });
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
}
