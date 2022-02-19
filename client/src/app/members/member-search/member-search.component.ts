import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { Position } from 'src/app/_models/position';
import { UserParams } from 'src/app/_models/userParams';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
  // members$: Observable<Member[]>;
  // positions: Position[];
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  appUserType = 'ColStudent';
  majorList = [
    { value: 'Accounting', display: 'Accounting' },
    { value: 'IT', display: 'IT' },
    { value: 'Business Analytics', display: 'Business Analytics' },
  ];
  locationList = [
    { value: 'Des Moines, IA', display: 'DSM' },
    { value: 'Cedar Rapids, IA', display: 'CR' },
  ];
  classYearList = [
    { value: 'Junior', display: 'Juniors' },
    { value: 'Senior', display: 'Seniors' },
  ];

  constructor(private searchMemberService: SearchMembersService) {
    this.userParams = new UserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.searchMemberService
      // .getSearchMembers(this.pageNumber, this.pageSize, this.appUserType)
      .getSearchMembers(this.userParams)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }
}
