import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { Position } from '../_models/position';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

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
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private http: HttpClient) {}

  // getSearchMembers(page?: number, itemsPerPage?: number, appUserType?: string) {
  getSearchMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      // params = params.append('appUserType', appUserType);
    }
    // if (this.members.length > 0) {
    //   return of(this.members);
    // }
    return this.http
      .get<Member[]>(this.baseUrl + 'searchusers', {
        observe: 'response',
        params,
      })
      .pipe(
        // map((members) => {
        //   this.members = members;
        //   return members; //map returns members back as observable
        // })
        map((response) => {
          this.paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return this.paginatedResult;
        })
      );
  }

  // getSearchMembers(appUserType: string) {
  //   return this.http.get<Member[]>(
  //     this.baseUrl + 'searchusers/GetByAppUserType/' + appUserType
  //   );
  // }

  getSearchMember(username: string) {
    const member = this.members.find((x) => x.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(
      this.baseUrl + 'searchusers/GetByName/' + username
    );
  }

  getSearchMemberById(appUserId: number) {
    console.log('hello');
    return this.http.get<Member>(
      this.baseUrl + 'searchusers/GetById/' + appUserId
    );
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

  setMainPhoto(photoId: number) {
    return this.http.put(
      this.baseUrl + 'searchusers/set-main-photo/' + photoId,
      {}
    );
  }

  deletePhoto(photoId: number) {
    return this.http.delete(
      this.baseUrl + 'searchusers/delete-photo/' + photoId
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
