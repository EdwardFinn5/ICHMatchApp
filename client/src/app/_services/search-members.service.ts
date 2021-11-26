import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { Position } from '../_models/position';

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

  getEmpInfo(appUserId: number) {
    console.log('getting emp info');
    return this.http.get<EmpInfo>(this.baseUrl + 'empinfos/' + appUserId);
  }

  getStudInfo(appUserId: number) {
    console.log('getting stud info');
    console.log(appUserId);
    console.log('previous is appUserId');
    return this.http.get<StudInfo>(this.baseUrl + 'studinfos/' + appUserId);
  }

  getPosition(appUserId: number) {
    console.log('getting position info');
    console.log(appUserId);
    console.log('previous is appUserId');
    return this.http.get<Position>(this.baseUrl + 'positions/' + appUserId);
  }
}
