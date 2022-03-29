import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DutyBullet } from '../_models/DutyBullet';
import { Position } from '../_models/position';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root',
})
export class BulletService {
  baseUrl = environment.apiUrl;
  private dutyBulletThreadSource = new BehaviorSubject<DutyBullet[]>([]);
  dirtyBullet$ = this.dutyBulletThreadSource.asObservable();
  private positionThreadSource = new BehaviorSubject<Position[]>([]);
  position$ = this.positionThreadSource.asObservable();

  constructor(private http: HttpClient, private busyService: BusyService) {}

  getdutyBullets(positionId: number) {
    return this.http.get<DutyBullet[]>(
      this.baseUrl + 'dutyBullets/' + positionId
    );
  }

  getDutyBullet(dutyBulletId: number) {
    console.log('duty id inside service get duty bullet: ', dutyBulletId);
    return this.http.get<DutyBullet>(
      this.baseUrl + 'dutybullets/getdutybulletbyid/' + dutyBulletId
    );
  }

  addDutyBullet(positionId: number, model: any) {
    return this.http.post<DutyBullet>(
      this.baseUrl + 'dutybullets/' + positionId,
      model
    );
  }

  updateDutyBullet(dutyBullet: DutyBullet, dutyBulletId: number) {
    console.log('2nd dutybulletid: ', dutyBulletId);
    return this.http.put(
      this.baseUrl + 'dutybullets/' + dutyBulletId,
      dutyBullet
    );
  }

  deleteDutyBullet(id: number) {
    return this.http.delete(this.baseUrl + 'dutybullets/' + id);
  }
}
