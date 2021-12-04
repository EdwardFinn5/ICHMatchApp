import { HttpClient } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
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

  // setCurrentStudInfo(studInfo: StudInfo) {
  //   this.currentStudInfoSource.next(studInfo);
  // }
}
