import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CiempLocation } from '../_models/ciempLocation';
import { StempLocation } from '../_models/stempLocation';

@Injectable({
  providedIn: 'root',
})
export class CiemplocationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCiempLocations() {
    return this.http.get<CiempLocation[]>(this.baseUrl + 'ciemplocation');
  }

  getStempLocations() {
    return this.http.get<StempLocation[]>(this.baseUrl + 'stemplocation');
  }

  getStempLocation(stempLocationId: number) {
    return this.http.get<StempLocation>(
      this.baseUrl + 'stemplocation/getstemplocationbyid/' + stempLocationId
    );
  }

  getCiempLocationsByStempLocationId(stempLocationId: number) {
    return this.http.get<CiempLocation[]>(
      this.baseUrl + 'ciemplocation/getbyid/' + stempLocationId
    );
  }

  getCiempLocation(ciempLocationId: number) {
    return this.http.get<CiempLocation>(
      this.baseUrl + 'ciemplocation/getciemplocationbyid/' + ciempLocationId
    );
  }

  addStempLocation(model: any) {
    return this.http.post<StempLocation>(
      this.baseUrl + 'stemplocation/',
      model
    );
  }

  deleteStempLocation(id: number) {
    return this.http.delete(this.baseUrl + 'stemplocation/' + id);
  }

  updateStempLocation(stempLocation: StempLocation, stempLocationId: number) {
    return this.http.put(
      this.baseUrl + 'stemplocation/' + stempLocationId,
      stempLocation
    );
  }

  addCiempLocation(model: any, id: number) {
    return this.http.post<CiempLocation>(
      this.baseUrl + 'ciemplocation/' + id,
      model
    );
  }

  deleteCiempLocation(id: number) {
    return this.http.delete(this.baseUrl + 'ciemplocation/' + id);
  }

  updateCiempLocation(ciempLocation: CiempLocation, ciempLocationId: number) {
    return this.http.put(
      this.baseUrl + 'ciemplocation/' + ciempLocationId,
      ciempLocation
    );
  }
}
