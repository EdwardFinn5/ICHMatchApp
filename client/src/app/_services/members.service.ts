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
  memberCache = new Map();
  // paginatedResult: PaginatedResult<CardMember[]> = new PaginatedResult<
  //   CardMember[]
  // >();

  constructor(private http: HttpClient) {}

  getMembers(userParams: UserParams, appUserType?: string) {
    console.log(Object.values(userParams).join('-'));
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('major', userParams.major);
    params = params.append('classYear', userParams.classYear);
    params = params.append('college', userParams.college);
    params = params.append('location', userParams.location);
    params = params.append('empIndustry', userParams.empIndustry);
    // params = params.append('appUserType', userParams.appUserType);
    params = params.append('orderByMajor', userParams.orderByMajor);
    params = params.append('orderByCollege', userParams.orderByCollege);
    params = params.append('orderByLocation', userParams.orderByLocation);
    params = params.append('orderByEmpName', userParams.orderByEmpName);
    params = params.append('orderByEmpIndustry', userParams.orderByEmpIndustry);

    return this.getPaginatedResult<CardMember[]>(
      this.baseUrl + 'cardusers/GetByAppUserType/' + appUserType,
      params
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    console.log(this.memberCache);
    // const cardMember = this.cardMembers.find((x) => x.username === username);
    // if (cardMember !== undefined) return of(cardMember);
    return this.http.get<CardMember>(this.baseUrl + 'cardusers/' + username);
  }

  getCardMemberById(appUserId: number) {
    console.log('hello');
    return this.http.get<CardMember>(
      this.baseUrl + 'cardusers/GetById/' + appUserId
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
