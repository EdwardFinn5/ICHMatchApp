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
import { CollegeService } from 'src/app/_services/college.service';
import { CilocationService } from 'src/app/_services/cilocation.service';

@Component({
  selector: 'app-member-list-search',
  templateUrl: './member-list-search.component.html',
  styleUrls: ['./member-list-search.component.css'],
})
export class MemberListSearchComponent implements OnInit {
  @Output() value: string = '';
  form: NgForm;
  members: Member[];
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
    private cilocationService: CilocationService,
    private collegeService: CollegeService
  ) {
    this.userParams = this.searchMembersService.getUserParams();
  }

  ngOnInit(): void {
    this.resetFilters();
    this.loadMembers();
    this.loadCoLocations();
    this.loadStLocations();
    this.loadColleges();
  }

  loadMembers() {
    console.log('load members');
    this.searchMembersService.setUserParams(this.userParams);
    this.searchMembersService
      .getSearchMembers(this.userParams)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  loadCoLocations() {
    this.cilocationService.getCoLocations().subscribe((coLocations) => {
      this.coLocations = coLocations;
      // console.log(this.categories);
    });
  }

  loadStLocations() {
    this.cilocationService.getStLocations().subscribe((stLocations) => {
      this.stLocations = stLocations;
      // console.log(this.categories);
    });
  }

  loadColleges() {
    this.collegeService.getColleges().subscribe((colleges) => {
      this.colleges = colleges;
      // console.log(this.categories);
    });
  }

  onCoSelect(coLocations) {
    // console.log(categories.target.value);
    this.cilocationService.getStLocations().subscribe((stLocations) => {
      this.stLocations = stLocations;
      // console.log('all majors', majors);
      this.stLocations = stLocations.filter(
        (s) => s.coLocationId == coLocations.target.value
      );
      console.log('coLocations id: ', coLocations.target.value);
    });
  }

  onStSelect(stLocations) {
    // console.log(categories.target.value);
    this.cilocationService.getCiLocations().subscribe((ciLocations) => {
      this.ciLocations = ciLocations;
      // console.log('all majors', majors);
      this.ciLocations = ciLocations.filter(
        (c) => c.stLocationId == stLocations.target.value
      );
      console.log('stLocations id: ', stLocations.target.value);
    });
  }

  resetFilters() {
    this.loadCoLocations();
    this.loadStLocations();
    this.userParams = this.searchMembersService.resetUserParams();
    this.loadMembers();
    // this.form.reset(this.form);
    this.value = 'this is a test';
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.searchMembersService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
