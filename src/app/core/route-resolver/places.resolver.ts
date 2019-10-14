import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadPlaces } from '@app/core/store/actions/place.action';
import { PlaceState } from '@app/core/store/state/place.state';
import { Place } from '@app/models/place';

@Injectable()
export class PlacesResolver implements Resolve<Observable<Place[]>>{

  constructor(private store: Store) {}

  resolve() {
    return this.store.dispatch(new LoadPlaces());
  }
}
