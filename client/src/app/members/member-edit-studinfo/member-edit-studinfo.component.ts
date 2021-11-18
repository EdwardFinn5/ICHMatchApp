import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { StudInfo } from 'src/app/_models/studinfo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-edit-studinfo',
  templateUrl: './member-edit-studinfo.component.html',
  styleUrls: ['./member-edit-studinfo.component.css'],
})
export class MemberEditStudinfoComponent implements OnInit {
  studInfo: StudInfo;
  user: User;

  constructor(
    private accountservice: AccountService,
    private searchMembersService: SearchMembersService
  ) {
    this.accountservice.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadStudInfo();
  }

  loadStudInfo() {
    this.searchMembersService
      .getStudInfo(this.user.appUserId)
      .subscribe((studInfo: StudInfo) => {
        this.studInfo = studInfo;
        console.log(studInfo.appUserId);
      });
  }
}
