import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CiLocation } from 'src/app/_models/ciLocation';
import { College } from 'src/app/_models/college';
import { CoLocation } from 'src/app/_models/coLocation';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { StLocation } from 'src/app/_models/stLocation';
import { UserParams } from 'src/app/_models/userParams';
import { SearchMembersService } from 'src/app/_services/search-members.service';
import { CiLocationService } from 'src/app/_services/ciLocation.service';
import { CollegeService } from 'src/app/_services/college.service';

@Component({
  selector: 'app-member-list-search',
  templateUrl: './member-list-search.component.html',
  styleUrls: ['./member-list-search.component.css'],
})
export class MemberListSearchComponent implements OnInit {
  @Output() value: string = '';
  form: NgForm;
  cardMembers: Member[];
  pagination: Pagination;
  userParams: UserParams;
  coLocations: CoLocation[];
  stLocations: StLocation[];
  ciLocations: CiLocation[];
  colleges: College[];
  classYearList = [
    { value: 'Freshman', display: 'Freshmen' },
    { value: 'Sophomore', display: 'Sophomores' },
    { value: 'Junior', display: 'Juniors' },
    { value: 'Senior', display: 'Seniors' },
  ];

  constructor(
    private searchMembersService: SearchMembersService,
    private ciLocationService: CiLocationService,
    private collegeService: CollegeService
  ) {
    this.userParams = this.searchMembersService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.searchMembersService.setUserParams(this.userParams);
    this.searchMembersService
      .getSearchMembers(this.userParams)
      .subscribe((response) => {
        this.cardMembers = response.result;
        this.pagination = response.pagination;
      });
  }
}
