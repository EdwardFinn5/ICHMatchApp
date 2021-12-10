import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpInfo } from '../_models/empInfo';

@Injectable({
  providedIn: 'root',
})
export class EmpinfoService {
  baseUrl = environment.apiUrl;
  private currentStudInfoSource = new ReplaySubject<EmpInfo>(1);
  currentStudInfo$ = this.currentStudInfoSource.asObservable();
  appUserType: string;

  constructor(private http: HttpClient, private router: Router) {}

  updateEmpInfoMember(empInfo: EmpInfo, appUserId: number) {
    console.log('getting empInfo info');
    console.log(appUserId);
    console.log('updating member empinfo');
    return this.http.put(this.baseUrl + 'empinfos/' + appUserId, empInfo);
  }

  getEmpInfo(appUserId: number) {
    console.log('getting emp info');
    console.log(appUserId);
    console.log('previous is appUserId');
    return this.http.get<EmpInfo>(this.baseUrl + 'empinfos/' + appUserId);
  }
}
