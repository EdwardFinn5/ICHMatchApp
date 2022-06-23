import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { Position } from '../_models/position';
import { map } from 'rxjs/operators';
import { Observable, of, ReplaySubject } from 'rxjs';
import { UserParams } from '../_models/userParams';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class Position2Service {
  baseUrl = environment.apiUrl;
  positions: Position[] = [];
  positionId: number;
  position: Position;
  userParams: UserParams;
  positionCache = new Map();
  private currentPositionSource = new ReplaySubject<Position>(1);
  currentPosition$ = this.currentPositionSource.asObservable();

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

  addPosition(model: any, id: number) {
    return this.http.post(this.baseUrl + 'positions2/' + id, model);
  }

  getPositions(userParams: UserParams) {
    console.log(Object.values(userParams).join('-'));
    var response = this.positionCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('posCategory', userParams.posCategory);
    params = params.append('posName', userParams.posName);
    params = params.append('positionType', userParams.positionType);
    params = params.append('ciempLocation', userParams.ciempLocation);
    params = params.append('orderByPosName', userParams.orderByPosName);
    params = params.append(
      'orderByRegisterCode',
      userParams.orderByRegisterCode
    );
    params = params.append(
      'orderByCiempLocation',
      userParams.orderByCiempLocation
    );

    return this.getPaginatedResult<Position[]>(
      this.baseUrl + 'positions2',
      params
    ).pipe(
      map((response) => {
        this.positionCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getPositionById(positionId: number) {
    const position = [...this.positionCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((position: Position) => position.positionId === positionId);
    console.log(position);
    if (position) {
      return of(position);
    }
    return this.http.get<Position>(
      this.baseUrl + 'positions2/GetPositionDtoById/' + positionId
    );
  }

  updatePosition(position: Position, positionId: number) {
    console.log('getting position info');
    console.log('updating position');
    console.log(position);
    return this.http.put(this.baseUrl + 'positions2/' + positionId, position);
  }

  deletePosition(id: number) {
    return this.http.delete(this.baseUrl + 'positions/' + id);
  }

  addLike(id: number) {
    return this.http.post(this.baseUrl + 'likes/AddById/' + id, {});
  }

  getLikes(predicate: string) {
    return this.http.get(this.baseUrl + 'likes?predicate=' + predicate);
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
