import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { Position } from 'src/app/_models/position';
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
  pageNumber = 1;
  pageSize = 4;
  appUserType = 'ColStudent';

  constructor(private searchMemberService: SearchMembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.searchMemberService
      // .getSearchMembers(this.pageNumber, this.pageSize, this.appUserType)
      .getSearchMembers(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  // loadMembers() {
  //   this.searchMemberService
  //     .getSearchMembers(this.appUserType)
  //     .subscribe((members) => {
  //       this.members = members;
  //     });
  // }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMembers();
  }
}
