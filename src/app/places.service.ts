import { Injectable } from '@angular/core';
import { Place } from './models/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  places: Place[] = [
    // tslint:disable-next-line: max-line-length
    {placeName: 'Vienna', placeRegion: 'Vienna', placeCountry:'Austria', placeVisited:'Mar 12 2019 10:00:00 AM', placeImageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/stock-photo-st-stephens-church-112868985.jpg?sharp=10&vib=20&w=1200'},
    // tslint:disable-next-line: max-line-length
    {placeName: 'New York City', placeRegion: 'New York', placeCountry:'USA', placeVisited:'Mar 12 2020 10:00:00 AM', placeImageUrl: 'https://pix10.agoda.net/geo/city/318/1_318_02.jpg?s=1920x822'},
    // tslint:disable-next-line: max-line-length
    {placeName: 'Biarritz', placeRegion: 'Biarritz', placeCountry:'France', placeVisited:'Mar 12 2001 10:00:00 AM', placeImageUrl: 'https://static.geo.de/bilder/eb/58/81806/article_image_big/biarritz-m-mxpnhw.jpg'}
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
