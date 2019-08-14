import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { AuthenticationService, CredentialsService, I18nService } from '@app/core';
import { Subscription } from 'rxjs';
import { SearchDataService } from '@app/shared/searchData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() sidenav!: MatSidenav;
  searchText: string;
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

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
    private searchData: SearchDataService
  ) {}

  ngOnInit() {
    this.observerSubscription = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
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
    this.searchInput.nativeElement.value = '';
    this.searchBarVisible = !this.searchBarVisible;
    this.displayStyle = 'none';  
    this.searchData.changeSearchData('');
  }

  onKey(event: any) {
    this.searchText = event.target.value;
    this.searchData.changeSearchData(this.searchText);
  }
}
