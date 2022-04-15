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
}
