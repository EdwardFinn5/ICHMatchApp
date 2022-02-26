import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { Position } from '../_models/position';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  paginatedResult: PaginatedResult<Position[]> = new PaginatedResult<
    Position[]
  >();

  constructor(private http: HttpClient) {}

  getPositions(userParams: UserParams) {
    console.log(Object.values(userParams).join('-'));
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('positionName', userParams.positionName);
    params = params.append('positionType', userParams.positionType);
    params = params.append('positionLocation', userParams.positionLocation);
    params = params.append(
      'orderByPositionName',
      userParams.orderByPositionName
    );
    params = params.append(
      'orderByPositionLocation',
      userParams.orderByPositionLocation
    );

    return this.getPaginatedResult<Position[]>(
      this.baseUrl + 'positions2',
      params
    );
  }

  getPositionById(positionId: number) {
    console.log('getting positionbyid');
    return this.http.get<Position>(
      this.baseUrl + 'positions2/GetPositionDtoById/' + positionId
    );
  }

  updatePosition(position: Position, positionId: number) {
    console.log('getting position info');
    console.log('id: ', positionId);
    console.log('updating position');
    return this.http.put(this.baseUrl + 'positions2/' + positionId, position);
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
