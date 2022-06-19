import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcBullet } from '../_models/acBullet';
import { DutyBullet } from '../_models/dutyBullet';
import { Position } from '../_models/position';
import { SkillsBullet } from '../_models/skillsBullet';
import { WorkBullet } from '../_models/workBullet';
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

  getAcBullets(studInfoId: number) {
    return this.http.get<AcBullet[]>(this.baseUrl + 'acbullets/' + studInfoId);
  }

  getWorkBullets(studInfoId: number) {
    return this.http.get<WorkBullet[]>(
      this.baseUrl + 'workBullets/' + studInfoId
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

  getAcBullet(acBulletId: number) {
    console.log('ac id inside service get ac bullet: ', acBulletId);
    return this.http.get<AcBullet>(
      this.baseUrl + 'acbullets/getacbulletbyid/' + acBulletId
    );
  }

  getWorkBullet(workBulletId: number) {
    console.log('work id inside service get work bullet: ', workBulletId);
    return this.http.get<WorkBullet>(
      this.baseUrl + 'workbullets/getworkbulletbyid/' + workBulletId
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

  addAcBullet(studInfoId: number, model: any) {
    return this.http.post<AcBullet>(
      this.baseUrl + 'acbullets/' + studInfoId,
      model
    );
  }

  addWorkBullet(studInfoId: number, model: any) {
    return this.http.post<WorkBullet>(
      this.baseUrl + 'workbullets/' + studInfoId,
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

  updateSkillsBullet(skillsBullet: SkillsBullet, skillsBulletId: number) {
    console.log('2nd skillsbulletid: ', skillsBulletId);
    return this.http.put(
      this.baseUrl + 'skillsbullets/' + skillsBulletId,
      skillsBullet
    );
  }

  updateAcBullet(acBullet: AcBullet, acBulletId: number) {
    console.log('2nd acbulletid: ', acBulletId);
    return this.http.put(this.baseUrl + 'acbullets/' + acBulletId, acBullet);
  }

  updateWorkBullet(workBullet: WorkBullet, workBulletId: number) {
    console.log('2nd workbulletid: ', workBulletId);
    return this.http.put(
      this.baseUrl + 'workbullets/' + workBulletId,
      workBullet
    );
  }

  deleteDutyBullet(id: number) {
    return this.http.delete(this.baseUrl + 'dutybullets/' + id);
  }

  deleteSkillsBullet(id: number) {
    return this.http.delete(this.baseUrl + 'skillsbullets/' + id);
  }

  deleteAcBullet(id: number) {
    return this.http.delete(this.baseUrl + 'acbullets/' + id);
  }

  deleteWorkBullet(id: number) {
    return this.http.delete(this.baseUrl + 'workbullets/' + id);
  }
}
