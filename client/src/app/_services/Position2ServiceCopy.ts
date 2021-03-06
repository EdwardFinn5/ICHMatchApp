import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { StudInfo } from '../_models/studinfo';
import { Position } from '../_models/position';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Position2Service {
  baseUrl = environment.apiUrl;
  positions: Position[] = [];
  positionId: number;
  position: Position;

  constructor(private http: HttpClient) {}

  getPositions() {
    return this.http.get<Position[]>(this.baseUrl + 'positions2');
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
}
