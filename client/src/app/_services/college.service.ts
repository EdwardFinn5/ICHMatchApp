import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { College } from '../_models/college';

@Injectable({
  providedIn: 'root',
})
export class CollegeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getColleges() {
    return this.http.get<College[]>(this.baseUrl + 'colleges');
  }
}
