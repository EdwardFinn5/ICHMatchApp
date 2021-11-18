import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
//   }),
// };

@Injectable({
  providedIn: 'root',
})
export class SearchMembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSearchMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'searchusers');
  }

  getSearchMember(username: string) {
    console.log('hello');
    return this.http.get<Member>(this.baseUrl + 'searchusers/' + username);
  }

  getStudInfo(appUserId: number) {
    console.log('getting stud info');
    return this.http.get<StudInfo>(this.baseUrl + 'studinfos/' + appUserId);
  }
}
