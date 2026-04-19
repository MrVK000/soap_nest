import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface RegionEntry {
  State: string;
  District: string;
  Pincode: string;
}

@Injectable({ providedIn: 'root' })
export class RegionService {
  private data$: Observable<RegionEntry[]>;

  constructor(private http: HttpClient) {
    this.data$ = this.http.get<RegionEntry[]>('assets/json/Indian-state-district-pincode.json').pipe(shareReplay(1));
  }

  getStates(): Observable<string[]> {
    return this.data$.pipe(map(data => [...new Set(data.map(e => e.State))].sort()));
  }

  getDistrictsByState(state: string): Observable<string[]> {
    return this.data$.pipe(map(data => [...new Set(data.filter(e => e.State === state).map(e => e.District))].sort()));
  }

  getPincodesByDistrict(district: string): Observable<string[]> {
    return this.data$.pipe(map(data => [...new Set(data.filter(e => e.District === district).map(e => e.Pincode))].sort()));
  }
}
