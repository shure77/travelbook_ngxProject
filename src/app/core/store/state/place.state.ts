import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Place } from '@app/models/place';
import { AddPlace, LoadPlaces, SetState } from '@app/core/store/actions/place.action';
import { PlacesService } from '@app/places.service';
import { map, take, tap } from 'rxjs/operators';

export class PlaceStateModel {
  places?: Place[];
}

@State<PlaceStateModel>({
  name: 'placesState',
  defaults: {}
})
export class PlaceState {

  constructor(public placesService: PlacesService) {
  }

  @Selector()
  static getPlaces(state: PlaceStateModel) {
    return state.places;
  }

  @Action(AddPlace)
  add({ getState, patchState }: StateContext<PlaceStateModel>, { payload }: AddPlace) {
    const state = getState();
    patchState({
      places: [...state.places, payload]
    });
  }

  @Action(LoadPlaces)
  private loadPlaces(ctx: StateContext<PlaceStateModel>) {
    return this.placesService.getPlacesFb().pipe(
      take(1),
      map(list => list.map(val => ({ $key: val.key, ...val.payload.val() }))),
      tap(val => {
        ctx.patchState({ places: val });
      })
    )
  }
}
