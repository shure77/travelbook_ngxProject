import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchDataService {
    
    private searchDataSource = new BehaviorSubject('');
    currentSearchData = this.searchDataSource.asObservable();

    constructor() {}

    changeSearchData(searchData: string) {
        this.searchDataSource.next(searchData);
    }
}