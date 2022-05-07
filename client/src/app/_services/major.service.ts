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

  getCategory(categoryId: number) {
    console.log('category id inside service get category: ', categoryId);
    return this.http.get<Category>(
      this.baseUrl + 'category/getcategorybyid/' + categoryId
    );
  }

  addCategory(model: any) {
    return this.http.post<Category>(this.baseUrl + 'category/', model);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + 'category/' + id);
  }

  updateCategory(category: Category, categoryId: number) {
    console.log('getting category info');
    console.log(categoryId);
    console.log('updating category');
    return this.http.put(this.baseUrl + 'category/' + categoryId, category);
  }

  addMajor(model: any, id: number) {
    return this.http.post(this.baseUrl + 'major/' + id, model);
  }

  deleteMajor(id: number) {
    return this.http.delete(this.baseUrl + 'major/' + id);
  }

  updateMajor(major: Major, majorId: number) {
    console.log('getting major info');
    console.log(majorId);
    console.log('updating major');
    return this.http.put(this.baseUrl + 'major/' + majorId, major);
  }
}
