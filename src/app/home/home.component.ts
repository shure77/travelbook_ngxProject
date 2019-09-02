import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { QuoteService } from './quote.service';
import { Subscription } from 'rxjs';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CreatePlaceComponent } from '@app/create-place/create-place.component';
import { PlacesService } from '@app/places.service';
import { PlaceDataService } from '@app/shared/placeData.service';
import { PlacesphotoService } from '@app/placesphoto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
@ViewChild('search', { static: false }) public searchElementRef: ElementRef; // get the DOM input element for autocomplete

  quote: string | undefined;
  isLoading = false;
  isMobile: boolean;

  observersubscription: Subscription;

  // inject MapsAPILoader and NgZone (for asynchronous operations outside the angular zone) for Google autocomplete
  constructor(
    private quoteService: QuoteService,
    private breakpointobserver: BreakpointObserver,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private placeDataService: PlaceDataService,
    private placeService: PlacesService,
    private placesphotoService: PlacesphotoService
  ) {}

  ngOnInit() {
    // setup subscription to detect the kind of device
    this.observersubscription = this.breakpointobserver
    .observe([Breakpoints.Small, Breakpoints.Handset])
    .subscribe((result: BreakpointState) => {
      this.isMobile = result.matches;
    });
  }

  ngAfterViewInit() {
    // load Places Autocomplete, returns a promise
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.openCreateDialog();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.placeService.initializeForm();
          this.placeDataService.setPlaceData(place);
          this.placeDataService.placeData.subscribe(value => {
            const placeName = value.name;
            const placeRegion = value.address_components[value.address_components.length - 2].long_name;
            const placeCountry = value.address_components[value.address_components.length - 1].long_name;
            this.placeService.form.get('placeName').setValue(placeName);
            this.placeService.form.get('placeRegion').setValue(placeRegion);
            this.placeService.form.get('placeCountry').setValue(placeCountry);
            this.searchElementRef.nativeElement.value='';
            this.placesphotoService.query = placeName;
          });
        });
      });
    });
  }

  ngOnDestroy() {
    this.observersubscription.unsubscribe;
  }

  openCreateDialog(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.position = {'top': '2%'};
    this.dialog.open(CreatePlaceComponent, dialogConfig);
  }
}
