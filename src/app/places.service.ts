import { Injectable } from '@angular/core';
import { Place } from './models/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  places: Place[] = [
    // tslint:disable-next-line: max-line-length
    {placeName: 'Vienna', placeRegion: 'Vienna', placeCountry:'Austria', placeVisited:'Jan 02 2019 10:00:00 AM', placeImageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/stock-photo-st-stephens-church-112868985.jpg?sharp=10&vib=20&w=1200'},
    // tslint:disable-next-line: max-line-length
    {placeName: 'New York City', placeRegion: 'New York', placeCountry:'USA', placeVisited:'Sep 18 2020 10:00:00 AM', placeImageUrl: 'https://pix10.agoda.net/geo/city/318/1_318_02.jpg?s=1920x822'},
    // tslint:disable-next-line: max-line-length
    {placeName: 'Biarritz', placeRegion: 'Biarritz', placeCountry:'France', placeVisited:'Mar 12 2001 10:00:00 AM', placeImageUrl: 'https://static.geo.de/bilder/eb/58/81806/article_image_big/biarritz-m-mxpnhw.jpg'},
    // tslint:disable-next-line: max-line-length
    {placeName: 'London', placeRegion: 'England', placeCountry:'United Kingdom', placeVisited:'Dec 03 2004 10:00:00 AM', placeImageUrl: 'https://www.visitbritain.com/sites/default/files/styles/consumer_vertical_hero__1920x1080/public/paragraphs_bundles/campaign_offer/images/london_0.jpg?itok=1vGDckSM'},
    // tslint:disable-next-line: max-line-length
    {placeName: 'Ubud', placeRegion: 'Bali', placeCountry:'Indonesia', placeVisited:'Aug 25 2018 10:00:00 AM', placeImageUrl: 'http://static.asiawebdirect.com/m/bangkok/portals/bali-indonesia-com/homepage/magazine/reasons-ubud-better-than-beach/pagePropertiesImage/ubud.jpg.jpg'}
  ]
  constructor() { }

  getPlaces() {
    // filter places by placeVisited
    const orderedPlaces = this.places.sort( (a, b) =>  { 
      const c = new Date(a.placeVisited).getTime();
      const d = new Date(b.placeVisited).getTime();
      return d - c;
    }); 
    return orderedPlaces;
  }
}
