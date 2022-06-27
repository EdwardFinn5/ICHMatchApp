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

  getCollege(collegeId: number) {
    return this.http.get<College>(
      this.baseUrl + 'colleges/getcollegebyid/' + collegeId
    );
  }
  addCollege(model: any) {
    return this.http.post<College>(this.baseUrl + 'colleges/', model);
  }

  deleteCollege(id: number) {
    return this.http.delete(this.baseUrl + 'colleges/' + id);
  }

  updateCollege(college: College, collegeId: number) {
    return this.http.put(this.baseUrl + 'colleges/' + collegeId, college);
  }
}
