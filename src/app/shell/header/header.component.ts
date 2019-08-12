import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { AuthenticationService, CredentialsService, I18nService } from '@app/core';
import { Subscription } from 'rxjs';
import { MatSearchBarComponent } from 'ng-mat-search-bar/src/app/ng-mat-search-bar/mat-search-bar/mat-search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  @ViewChild('searchBar', {static: false}) public searchBar: ElementRef<MatSearchBarComponent>;

  isMobile: boolean;
  observerSubscription: Subscription;
  searchBarVisible: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.observerSubscription = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
      });
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

  handleOpen(){
    this.searchBarVisible = (this.searchBar as MatSearchBarComponent).searchVisible;
  }

  handleClose(){
    this.searchBarVisible = this.searchBar.searchVisible;
  }

}