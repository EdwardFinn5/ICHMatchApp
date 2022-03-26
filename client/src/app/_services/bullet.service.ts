import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DutyBullet } from '../_models/DutyBullet';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root',
})
export class BulletService {
  baseUrl = environment.apiUrl;
  private dutyBulletThreadSource = new BehaviorSubject<DutyBullet[]>([]);
  dirtyBullet$ = this.dutyBulletThreadSource.asObservable();

  constructor(private http: HttpClient, private busyService: BusyService) {}

  getdutyBullets(positionId: number) {
    return this.http.get<DutyBullet[]>(
      this.baseUrl + 'dutyBullets/' + positionId
    );
  }
}
