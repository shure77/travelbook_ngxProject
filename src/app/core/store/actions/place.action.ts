import { Place } from '@app/models/place';

export class SetState {
  public static readonly type = '[Place] SetState';

  constructor(public payload: Place) {}
}

export class AddPlace {
  static readonly type ='[Place] Add';

  constructor(public payload: Place) {}
}

export class DeletePlace {
  static readonly type ='[Place] Delete';

  constructor(public id: string) {}
}

export class LoadPlaces {
  static readonly type='[Place] Load Places';

  constructor(){}
}
