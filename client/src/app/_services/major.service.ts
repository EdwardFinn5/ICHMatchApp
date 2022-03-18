import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Major } from '../_models/major';

@Injectable({
  providedIn: 'root',
})
export class MajorService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  getMajors() {
    return this.http.get<Major[]>(this.baseUrl + 'major');
  }
}
