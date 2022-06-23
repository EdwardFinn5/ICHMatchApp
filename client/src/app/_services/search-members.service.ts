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
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class SearchMembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  searchEmpMemberCache = new Map();
  userParams: UserParams;

  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams();
    return this.userParams;
  }

  getSearchMembers(userParams: UserParams) {
    console.log(Object.values(userParams).join('-'));
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('major', userParams.major);
    params = params.append('category', userParams.category);
    params = params.append('classYear', userParams.classYear);
    params = params.append('coLocation', userParams.coLocation);
    params = params.append('stLocation', userParams.stLocation);
    params = params.append('ciLocation', userParams.ciLocation);
    // params = params.append('appUserType', userParams.appUserType);
    params = params.append('orderByMajor', userParams.orderByMajor);
    params = params.append('orderByCategory', userParams.orderByCategory);
    params = params.append('orderByCiLocation', userParams.orderByCiLocation);

    return getPaginatedResult<Member[]>(
      this.baseUrl + 'searchusers',
      params,
      this.http
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getSearchMember(username: string) {
    // console.log(this.memberCache);
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);
    if (member) {
      return of(member);
    }
    console.log(member);

    return this.http.get<Member>(
      this.baseUrl + 'searchusers/GetByName/' + username
    );
  }

  getByIdSearchMember(id: number) {
    return this.http.get<Member>(this.baseUrl + 'searchusers/GetById/' + id);
  }

  getSearchEmpMembers(userParams: UserParams) {
    console.log(Object.values(userParams).join('-'));
    var response = this.searchEmpMemberCache.get(
      Object.values(userParams).join('-')
    );
    if (response) {
      return of(response);
    }
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('ciempLocation', userParams.ciempLocation);
    params = params.append('stempLocation', userParams.stempLocation);
    params = params.append('empIndustry', userParams.empIndustry);
    params = params.append('orderByEmpName', userParams.orderByEmpName);

    return this.getPaginatedResult<Member[]>(
      this.baseUrl + 'searchusers/GetByEmpMemberType',
      params
    ).pipe(
      map((response) => {
        this.searchEmpMemberCache.set(
          Object.values(userParams).join('-'),
          response
        );
        return response;
      })
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

  setMainHrPhoto(photoId: number) {
    return this.http.put(
      this.baseUrl + 'searchusers/set-main-hr-photo/' + photoId,
      {}
    );
  }

  deletePhoto(photoId: number) {
    return this.http.delete(
      this.baseUrl + 'searchusers/delete-photo/' + photoId
    );
  }

  deleteHrPhoto(photoId: number) {
    return this.http.delete(
      this.baseUrl + 'searchusers/delete-photo-hr/' + photoId
    );
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/AddByName/' + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(
      this.baseUrl + 'likes',
      params,
      this.http
    );
    // return this.http.get<Partial<Member[]>>(
    //   this.baseUrl + 'likes?predicate=' + predicate
    // );
  }

  private getPaginatedResult<T>(url: string, params: any) {
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
