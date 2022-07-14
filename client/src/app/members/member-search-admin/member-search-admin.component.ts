import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-search-admin',
  templateUrl: './member-search-admin.component.html',
  styleUrls: ['./member-search-admin.component.css'],
})
export class MemberSearchAdminComponent implements OnInit {
  members: Member[];
  member: Member;
  user: User;
  pagination: Pagination;
  userParams: UserParams;
  // appUserType = 'ColStudent';
  majorList = [
    { value: 'Accounting', display: 'Accounting' },
    { value: 'IT', display: 'IT' },
    { value: 'Business Analytics', display: 'Business Analytics' },
  ];
  ciLocationList = [
    { value: 'Des Moines, IA', display: 'Des Moines, IA' },
    { value: 'Cedar Rapids, IA', display: 'Cedar Rapids, IA' },
  ];
  classYearList = [
    { value: 'Junior', display: 'Juniors' },
    { value: 'Senior', display: 'Seniors' },
  ];

  constructor(
    private searchMemberService: SearchMembersService,
    private accountservice: AccountService
  ) {
    this.userParams = this.searchMemberService.getUserParams();
    this.accountservice.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.searchMemberService.setUserParams(this.userParams);
    this.searchMemberService
      .getAdminSearchMembers(this.userParams, this.user.college)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  resetFilters() {
    this.userParams = this.searchMemberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.searchMemberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
