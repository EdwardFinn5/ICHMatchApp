import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  appUserType: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.appUserType = user.appUserType;
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  registerStud(model: any) {
    return this.http.post(this.baseUrl + 'account/registerstud', model).pipe(
      map((user: User) => {
        if (user) {
          // this.setCurrentUser(user); //added this line when we moved the one below to setCurrentUser
          // this.presence.createHubConnection(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.appUserType = user.appUserType;
        }
      })
    );
  }

  registerEmp(model: any) {
    return this.http.post(this.baseUrl + 'account/registeremp', model).pipe(
      map((user: User) => {
        if (user) {
          // this.setCurrentUser(user); //added this line when we moved the one below to setCurrentUser
          // this.presence.createHubConnection(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.appUserType = user.appUserType;
          this.router.navigateByUrl('/memberlist');
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
