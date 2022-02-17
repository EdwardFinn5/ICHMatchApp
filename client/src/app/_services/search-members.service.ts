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
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root',
})
export class SearchMembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getSearchMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('major', userParams.major);
    params = params.append('classYear', userParams.classYear);
    params = params.append('location', userParams.location);
    params = params.append('appUserType', userParams.appUserType);

    return this.getPaginatedResult<Member[]>(
      this.baseUrl + 'searchusers',
      params
    );
  }

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

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http
      .get<T>(url, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }
}
