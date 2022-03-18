import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CardMember } from '../_models/cardMember';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  cardMembers: CardMember[] = [];
  // appUserType: string;
  empMemberCache = new Map();
  studMemberCache = new Map();
  userParams: UserParams;
  // paginatedResult: PaginatedResult<CardMember[]> = new PaginatedResult<
  //   CardMember[]
  // >();

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

  getStudMembers(userParams: UserParams) {
    console.log(Object.values(userParams).join('-'));
    var response = this.studMemberCache.get(
      Object.values(userParams).join('-')
    );
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('major', userParams.major);
    params = params.append('category', userParams.category);
    params = params.append('classYear', userParams.classYear);
    params = params.append('college', userParams.college);
    // params = params.append('location', userParams.location);
    // params = params.append('empIndustry', userParams.empIndustry);
    params = params.append('orderByMajor', userParams.orderByMajor);
    params = params.append('orderByFirstName', userParams.orderByFirstName);
    // params = params.append('orderByCollege', userParams.orderByCollege);
    // params = params.append('orderByLocation', userParams.orderByLocation);
    // params = params.append('orderByEmpName', userParams.orderByEmpName);
    // params = params.append('orderByEmpIndustry', userParams.orderByEmpIndustry);

    return this.getPaginatedResult<CardMember[]>(
      this.baseUrl + 'cardusers/GetByStudUserType',
      params
    ).pipe(
      map((response) => {
        this.studMemberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getEmpMembers(userParams: UserParams) {
    console.log(Object.values(userParams).join('-'));
    var response = this.empMemberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    // params = params.append('major', userParams.major);
    // params = params.append('classYear', userParams.classYear);
    // params = params.append('college', userParams.college);
    params = params.append('location', userParams.location);
    params = params.append('empIndustry', userParams.empIndustry);
    // params = params.append('orderByMajor', userParams.orderByMajor);
    // params = params.append('orderByCollege', userParams.orderByCollege);
    // params = params.append('orderByLocation', userParams.orderByLocation);
    params = params.append('orderByEmpName', userParams.orderByEmpName);
    // params = params.append('orderByEmpIndustry', userParams.orderByEmpIndustry);

    return this.getPaginatedResult<CardMember[]>(
      this.baseUrl + 'cardusers/GetByEmpUserType',
      params
    ).pipe(
      map((response) => {
        this.empMemberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    return this.http.get<CardMember>(this.baseUrl + 'cardusers/' + username);
  }

  getCardMemberById(appUserId: number) {
    const cardMember = [...this.empMemberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((cardMember: CardMember) => cardMember.appUserId === appUserId);
    console.log(cardMember);
    if (cardMember) {
      return of(cardMember);
    }
    return this.http.get<CardMember>(
      this.baseUrl + 'cardusers/GetById/' + appUserId
    );
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/AddByName/' + username, {});
  }

  getLikes(predicate: string) {
    return this.http.get<Partial<CardMember[]>>(
      this.baseUrl + 'likes?predicate=' + predicate
    );
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
