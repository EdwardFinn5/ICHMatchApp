import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DutyBullet } from '../_models/dutyBullet';
import { Position } from '../_models/position';
import { SkillsBullet } from '../_models/skillsBullet';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root',
})
export class BulletService {
  baseUrl = environment.apiUrl;
  // private dutyBulletThreadSource = new BehaviorSubject<DutyBullet[]>([]);
  // dirtyBullet$ = this.dutyBulletThreadSource.asObservable();
  private positionThreadSource = new BehaviorSubject<Position[]>([]);
  position$ = this.positionThreadSource.asObservable();

  constructor(private http: HttpClient, private busyService: BusyService) {}

  getDutyBullets(positionId: number) {
    return this.http.get<DutyBullet[]>(
      this.baseUrl + 'dutyBullets/' + positionId
    );
  }

  getSkillsBullets(positionId: number) {
    return this.http.get<SkillsBullet[]>(
      this.baseUrl + 'skillsBullets/' + positionId
    );
  }

  getDutyBullet(dutyBulletId: number) {
    console.log('duty id inside service get duty bullet: ', dutyBulletId);
    return this.http.get<DutyBullet>(
      this.baseUrl + 'dutybullets/getdutybulletbyid/' + dutyBulletId
    );
  }

  getSkillsBullet(skillsBulletId: number) {
    console.log('skills id inside service get skills bullet: ', skillsBulletId);
    return this.http.get<SkillsBullet>(
      this.baseUrl + 'skillsbullets/getskillsbulletbyid/' + skillsBulletId
    );
  }

  addDutyBullet(positionId: number, model: any) {
    return this.http.post<DutyBullet>(
      this.baseUrl + 'dutybullets/' + positionId,
      model
    );
  }

  addSkillsBullet(positionId: number, model: any) {
    return this.http.post<SkillsBullet>(
      this.baseUrl + 'skillsbullets/' + positionId,
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

  updateSkilsBullet(skillsBullet: SkillsBullet, skillsBulletId: number) {
    console.log('2nd skillsbulletid: ', skillsBulletId);
    return this.http.put(
      this.baseUrl + 'skillsbullets/' + skillsBulletId,
      skillsBullet
    );
  }

  deleteDutyBullet(id: number) {
    return this.http.delete(this.baseUrl + 'dutybullets/' + id);
  }

  deleteSkillsBullet(id: number) {
    return this.http.delete(this.baseUrl + 'skillsbullets/' + id);
  }
}
