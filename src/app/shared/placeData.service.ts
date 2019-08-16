import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PlaceDataService {
    
    public placeData = new BehaviorSubject<any>('');

    constructor() {}

    

    setPlaceData(placeData: any) {
        this.placeData.next(placeData);
    }
}