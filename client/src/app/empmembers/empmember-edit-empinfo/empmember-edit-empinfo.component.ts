import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { EmpInfo } from 'src/app/_models/empInfo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-edit-empinfo',
  templateUrl: './empmember-edit-empinfo.component.html',
  styleUrls: ['./empmember-edit-empinfo.component.css'],
})
export class EmpmemberEditEmpinfoComponent implements OnInit {
  empInfo: EmpInfo;
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
      .getEmpInfo(this.user.appUserId)
      .subscribe((empInfo: EmpInfo) => {
        this.empInfo = empInfo;
        console.log(empInfo.appUserId);
      });
  }
}
