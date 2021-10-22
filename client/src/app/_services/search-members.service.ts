import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SearchMembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSearchMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'searchusers', httpOptions);
  }

  getSearchMember(username: string) {
    return this.http.get<Member[]>(
      this.baseUrl + 'searchusers/' + username,
      httpOptions
    );
  }
}
