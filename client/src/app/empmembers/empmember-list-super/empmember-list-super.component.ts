import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-list-super',
  templateUrl: './empmember-list-super.component.html',
  styleUrls: ['./empmember-list-super.component.css'],
})
export class EmpmemberListSuperComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  empIndustryList = [
    { value: 'Manufacturing', display: 'Manufacturing' },
    { value: 'Insurance', display: 'Insurance' },
    { value: 'Banking', display: 'Banking' },
  ];
  locationList = [
    { value: 'Des Moines, IA', display: 'Des Moines, IA' },
    { value: 'Cedar Rapids, IA', display: 'Cedar Rapids, IA' },
    { value: 'Muscatine, IA', display: 'Muscatine, IA' },
  ];

  constructor(private searchMemberService: SearchMembersService) {
    this.userParams = this.searchMemberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.searchMemberService.setUserParams(this.userParams);
    this.searchMemberService
      .getSearchEmpMembers(this.userParams)
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
