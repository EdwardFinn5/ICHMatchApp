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
    return this.http.get<CiLocation[]>(this.baseUrl + 'cilocation');
  }

  getCoLocations() {
    return this.http.get<CoLocation[]>(this.baseUrl + 'colocation');
  }

  getStLocations() {
    return this.http.get<StLocation[]>(this.baseUrl + 'stlocation');
  }

  getCoLocation(coLocationId: number) {
    return this.http.get<CoLocation>(
      this.baseUrl + 'colocation/getcolocationbyid/' + coLocationId
    );
  }

  getStLocationsByCoLocationId(coLocationId: number) {
    return this.http.get<StLocation[]>(
      this.baseUrl + 'stlocation/getbyid/' + coLocationId
    );
  }

  getCiLocationsByStLocationId(stLocationId: number) {
    return this.http.get<CiLocation[]>(
      this.baseUrl + 'cilocation/getbyid/' + stLocationId
    );
  }

  getStLocation(stLocationId: number) {
    return this.http.get<StLocation>(
      this.baseUrl + 'stlocation/getstlocationbyid/' + stLocationId
    );
  }

  getCiLocation(ciLocationId: number) {
    return this.http.get<CiLocation>(
      this.baseUrl + 'cilocation/getcilocationbyid/' + ciLocationId
    );
  }

  addCoLocation(model: any) {
    return this.http.post<CoLocation>(this.baseUrl + 'colocation/', model);
  }

  deleteCoLocation(id: number) {
    return this.http.delete(this.baseUrl + 'colocation/' + id);
  }

  updateCoLocation(coLocation: CoLocation, coLocationId: number) {
    return this.http.put(
      this.baseUrl + 'colocation/' + coLocationId,
      coLocation
    );
  }

  addStLocation(model: any, id: number) {
    return this.http.post<StLocation>(this.baseUrl + 'stlocation/' + id, model);
  }

  deleteStLocation(id: number) {
    return this.http.delete(this.baseUrl + 'stlocation/' + id);
  }

  updateStLocation(stLocation: StLocation, stLocationId: number) {
    return this.http.put(
      this.baseUrl + 'stlocation/' + stLocationId,
      stLocation
    );
  }

  addCiLocation(model: any, id: number) {
    return this.http.post<CiLocation>(this.baseUrl + 'cilocation/' + id, model);
  }

  deleteCiLocation(id: number) {
    return this.http.delete(this.baseUrl + 'cilocation/' + id);
  }

  updateCiLocation(ciLocation: CiLocation, ciLocationId: number) {
    return this.http.put(
      this.baseUrl + 'cilocation/' + ciLocationId,
      ciLocation
    );
  }
}
