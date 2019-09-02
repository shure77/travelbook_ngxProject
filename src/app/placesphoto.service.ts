import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesphotoService {

  apikeyUsplash = '8dfaf1d61b3e610521ed0d125dd967f2fb6959de49155adb7d4f1f9433980458';
  query = '';

  constructor(private http: HttpClient) { }

  getPlacephoto(): Observable<any> {
    return this.http.get('https://api.unsplash.com/search/photos?page=1&per_page=3&orientation=landscape&query=' + this.query + '&client_id=' + this.apikeyUsplash);
  }
}
