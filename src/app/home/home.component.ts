import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { QuoteService } from './quote.service';
import { Subscription } from 'rxjs';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('search', { static: false }) public searchElementRef: ElementRef; // get the DOM input element for autocomplete

  quote: string | undefined;
  isLoading = false;
  isMobile = false;

  observersubscription: Subscription;

  // inject MapsAPILoader and NgZone (for asynchronous operations outside the angular zone) for Google autocomplete
  constructor(
    private quoteService: QuoteService,
    private breakpointobserver: BreakpointObserver,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
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
}