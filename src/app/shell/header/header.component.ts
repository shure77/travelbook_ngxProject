import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, ViewChild, ElementRef, NgZone, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { AuthenticationService, CredentialsService, I18nService } from '@app/core';
import { Subscription } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() sidenav!: MatSidenav;
  @ViewChild('searchToolbar', { static: false }) public searchElementRef: ElementRef;

  isMobile: boolean;
  observerSubscription: Subscription;
  searchBarVisible = false;
  displayStyle = 'none';

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService,
    private breakpointObserver: BreakpointObserver,
    private mapsAPILoaderTb: MapsAPILoader,
    private ngZoneTb: NgZone
  ) {}

  ngOnInit() {
    this.observerSubscription = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
      });
      this.mapsAPILoaderTb.load().then(() => {
        const autocompleteTb = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocompleteTb.addListener('place_changed', () => {
          this.ngZoneTb.run(() => {
            // get the place result
            const placeTb: google.maps.places.PlaceResult = autocompleteTb.getPlace();
            // verify result
            if (placeTb.geometry === undefined || placeTb.geometry === null) {
              return;
            }
          });
        });
      });
  }

  ngOnChanges() {
    
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  triggerSearchbarOn(){
    this.searchBarVisible = !this.searchBarVisible;
    this.displayStyle = 'block';    
  }

  triggerSearchbarOff(){
    this.searchBarVisible = !this.searchBarVisible;
    this.displayStyle = 'none';  
    this.searchElementRef.nativeElement.value = ''; 
  }
}
