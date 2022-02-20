import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardMember } from 'src/app/_models/cardMember';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  cardMembers: CardMember[];
  pagination: Pagination;
  userParams: UserParams;
  appUserType = 'ColStudent';
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
    this.userParams = new UserParams();
  }

  ngOnInit(): void {
    this.loadCardMembers();
  }

  loadCardMembers() {
    this.membersService
      .getMembers(this.userParams, this.appUserType)
      .subscribe((response) => {
        this.cardMembers = response.result;
        this.pagination = response.pagination;
      });
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadCardMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadCardMembers();
  }
}
