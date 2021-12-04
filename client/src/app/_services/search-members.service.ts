import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { Position } from '../_models/position';
import { map } from 'rxjs/operators';

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
  members: Member[] = [];

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

  // getStudInfo(appUserId: number) {
  //   console.log('getting stud info');
  //   console.log(appUserId);
  //   console.log('previous is appUserId');
  //   return this.http.get<StudInfo>(this.baseUrl + 'studinfos/' + appUserId);
  // }

  getPosition(appUserId: number) {
    console.log('getting position info');
    console.log(appUserId);
    console.log('previous is appUserId');
    return this.http.get<Position>(this.baseUrl + 'positions/' + appUserId);
  }

  updateMemberCard(member: Member) {
    console.log('updating member card');
    return this.http.put(this.baseUrl + 'searchusers', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  // updateStudInfoMember(studInfo: StudInfo, appUserId: number) {
  //   console.log('getting studInfo info');
  //   console.log(appUserId);
  //   console.log('updating member studinfo');
  //   return this.http.put(this.baseUrl + 'studinfos/' + appUserId, studInfo);
  // }

  // updateSearchMember(member: Member) {
  //   console.log('updating member');
  //   return this.http.put(this.baseUrl + 'searchusers', member);
  // }
}
