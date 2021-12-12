import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Position } from '../_models/position';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  baseUrl = environment.apiUrl;
  private currentPositionSource = new ReplaySubject<Position>(1);
  currentStudInfo$ = this.currentPositionSource.asObservable();
  appUserType: string;

  constructor(private http: HttpClient, private router: Router) {}

  addPosition(model: any, id: number) {
    return this.http.post(this.baseUrl + 'positions/' + id, model);
  }

  updatePosition(position: Position, positionId: number) {
    console.log('getting position info');
    console.log(positionId);
    console.log('updating position');
    return this.http.put(this.baseUrl + 'positions/' + positionId, position);
  }

  getPositions(appUserId: number) {
    console.log('getting position info');
    console.log(appUserId);
    console.log('previous is appUserId');
    return this.http.get<Position[]>(
      this.baseUrl + 'positions/GetById/' + appUserId
    );
  }

  deletePosition(id: number) {
    return this.http.delete(this.baseUrl + 'positions/' + id);
  }
}
