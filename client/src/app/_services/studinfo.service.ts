import { HttpClient } from '@angular/common/http';
import { R3Identifiers } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudInfo } from '../_models/studinfo';

@Injectable({
  providedIn: 'root',
})
export class StudinfoService {
  baseUrl = environment.apiUrl;
  private currentStudInfoSource = new ReplaySubject<StudInfo>(1);
  currentStudInfo$ = this.currentStudInfoSource.asObservable();
  appUserType: string;

  constructor(private http: HttpClient, private router: Router) {}

  addStudInfo(model: any, id: number) {
    return this.http.post(this.baseUrl + 'studinfos/' + id, model);
  }

  updateStudInfoMember(studInfo: StudInfo, appUserId: number) {
    console.log('getting studInfo info');
    console.log(appUserId);
    console.log('updating member studinfo');
    return this.http.put(this.baseUrl + 'studinfos/' + appUserId, studInfo);
  }

  getStudInfoById(studInfoId: number) {
    return this.http.get<StudInfo>(
      this.baseUrl + 'studInfo/GetStudInfoDtoById/' + studInfoId
    );
  }

  getStudInfo(appUserId: number) {
    console.log('getting stud info');
    console.log(appUserId);
    console.log('previous is appUserId');
    return this.http.get<StudInfo>(this.baseUrl + 'studinfos/' + appUserId);
  }

  // setCurrentStudInfo(studInfo: StudInfo) {
  //   this.currentStudInfoSource.next(studInfo);
  // }
}
