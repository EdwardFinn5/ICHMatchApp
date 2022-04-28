import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CiLocation } from '../_models/ciLocation';
import { CoLocation } from '../_models/coLocation';
import { StLocation } from '../_models/stLocation';

@Injectable({
  providedIn: 'root',
})
export class CilocationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCiLocations() {
    return this.http.get<CiLocation[]>(this.baseUrl + 'ciLocation');
  }

  getCoLocations() {
    return this.http.get<CoLocation[]>(this.baseUrl + 'colocation');
  }

  getStLocations() {
    return this.http.get<StLocation[]>(this.baseUrl + 'stlocation');
  }
}
