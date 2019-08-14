import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { QuoteService } from './quote.service';
import { Subscription } from 'rxjs';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CreatePlaceComponent } from '@app/create-place/create-place.component';

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
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
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

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
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
    dialogConfig.position = {'top': '20%'};
    this.dialog.open(CreatePlaceComponent, dialogConfig);
  }
}
