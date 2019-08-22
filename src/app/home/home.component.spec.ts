import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-places',
  template: ''
})
class MockPlacesComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        CoreModule,
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [HomeComponent, MockPlacesComponent],
      providers: [
        QuoteService,
        {
          provide: MapsAPILoader,
          useValue: { load: jasmine.createSpy('load').and.returnValue(new Promise(() => true)) }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should contain app-places directive', () => {
    const element: HTMLElement = fixture.nativeElement;
    const appPlaces = element.querySelector('app-places');
    
    expect(appPlaces).toBeTruthy();
  });
});
