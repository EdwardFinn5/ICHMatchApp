import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StudInfo } from '../_models/studinfo';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  studInfo: StudInfo;
  user: User;

  constructor(public accountService: AccountService, private route: Router) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
    this.accountService.currentStudInfo$
      .pipe(take(1))
      .subscribe((studInfo) => (this.studInfo = studInfo));
  }

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
    this.route.navigateByUrl('/');
  }
}
