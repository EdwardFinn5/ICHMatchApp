import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';
import { MemberSearchCardComponent } from '../member-search-card/member-search-card.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  cardMembers: CardMember[];
  pagination: Pagination;
  userParams: UserParams;
  // appUserType = 'ColStudent';
  majorList = [
    { value: 'Accounting', display: 'Accounting' },
    { value: 'IT', display: 'IT' },
    { value: 'Business Analytics', display: 'Business Analytics' },
  ];
  collegeList = [
    { value: 'St. Ambrose University', display: 'St. Ambrose' },
    { value: 'Grand View University', display: 'Grand View' },
  ];
  classYearList = [
    { value: 'Junior', display: 'Juniors' },
    { value: 'Senior', display: 'Seniors' },
  ];

  constructor(private membersService: MembersService) {
    this.userParams = this.membersService.getUserParams();
  }

  ngOnInit(): void {
    // this.resetFilters;
    this.loadCardMembers();
  }

  loadCardMembers() {
    this.membersService.setUserParams(this.userParams);
    this.membersService
      .getStudMembers(this.userParams)
      .subscribe((response) => {
        this.cardMembers = response.result;
        this.pagination = response.pagination;
      });
  }

  resetFilters() {
    this.userParams = this.membersService.resetUserParams();
    this.loadCardMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.membersService.setUserParams(this.userParams);
    this.loadCardMembers();
  }
}
