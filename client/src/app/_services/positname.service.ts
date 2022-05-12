import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Major } from '../_models/major';
import { PosCategory } from '../_models/posCategory';
import { PositName } from '../_models/positName';

@Injectable({
  providedIn: 'root',
})
export class PositNameService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPosCategories() {
    return this.http.get<PosCategory[]>(this.baseUrl + 'poscategory');
  }

  getPositNames() {
    return this.http.get<PositName[]>(this.baseUrl + 'positname');
  }

  getPositnamesByPosCategoryId(posCategoryId: number) {
    return this.http.get<PositName[]>(
      this.baseUrl + 'positName/getbyid/' + posCategoryId
    );
  }

  getPosCategory(posCategoryId: number) {
    console.log(
      'posCategory id inside service get posCategory: ',
      posCategoryId
    );
    return this.http.get<PosCategory>(
      this.baseUrl + 'poscategory/getposcategorybyid/' + posCategoryId
    );
  }

  getPositName(positNameId: number) {
    console.log('PositName id inside service get positName: ', positNameId);
    return this.http.get<PositName>(
      this.baseUrl + 'positname/getpositnamebyid/' + positNameId
    );
  }

  addPosCategory(model: any) {
    return this.http.post<PosCategory>(this.baseUrl + 'poscategory/', model);
  }

  deletePosCategory(id: number) {
    return this.http.delete(this.baseUrl + 'poscategory/' + id);
  }

  updatePosCategory(posCategory: PosCategory, posCategoryId: number) {
    console.log('getting posCategory info');
    console.log(posCategoryId);
    console.log('updating posCategory');
    return this.http.put(
      this.baseUrl + 'poscategory/' + posCategoryId,
      posCategory
    );
  }

  addPositName(model: any, id: number) {
    return this.http.post<PositName>(this.baseUrl + 'positname/' + id, model);
  }

  deletePositName(id: number) {
    return this.http.delete(this.baseUrl + 'positname/' + id);
  }

  updatePositName(positName: PositName, positNameId: number) {
    console.log('getting positName info');
    console.log(positNameId);
    console.log('updating major');
    return this.http.put(this.baseUrl + 'positname/' + positNameId, positName);
  }
}
