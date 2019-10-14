import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Place } from '@app/models/place';
import { AddPlace, DeletePlace, LoadPlaces, SetState } from '@app/core/store/actions/place.action';
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
      take(1), // subscription must complete
      map(list => list.map(val => ({ $key: val.key, ...val.payload.val() }))),
      map(unsortedList =>
        unsortedList.sort((a, b) => {
          const c = new Date(a.placeVisited).getTime();
          const d = new Date(b.placeVisited).getTime();
          return d - c;
        })
      ),// sort the list by time visited
      tap(val => {
        ctx.patchState({ places: val });
      })
    )
  }

  @Action(DeletePlace)
  private deletePlace({getState, setState}: StateContext<PlaceStateModel>, {id}: DeletePlace) {
    return this.placesService.deletePlace(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.places.filter(item => item.$key !== id);
        setState({
          ...state,
          places: filteredArray,
        });
      })
    )
  }
}
