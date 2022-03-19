import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { DateInputComponent } from 'src/app/_forms/date-input/date-input.component';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { CardMember } from 'src/app/_models/cardMember';
import { Category } from 'src/app/_models/category';
import { College } from 'src/app/_models/college';
import { Major } from 'src/app/_models/major';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { CollegeService } from 'src/app/_services/college.service';
import { MajorService } from 'src/app/_services/major.service';
import { MembersService } from 'src/app/_services/members.service';
import { MemberSearchCardComponent } from '../member-search-card/member-search-card.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  @Output() value: string = '';
  // @Input() value: string = '';
  form: NgForm;
  cardMembers: CardMember[];
  pagination: Pagination;
  userParams: UserParams;
  categories: Category[];
  majors: Major[];
  colleges: College[];
  // appUserType = 'ColStudent';
  // majorList = [
  //   { value: 'Accounting', display: 'Accounting' },
  //   { value: 'IT', display: 'IT' },
  //   { value: 'Business Analytics', display: 'Business Analytics' },
  // ];
  // collegeList = [
  //   { value: 'St. Ambrose University', display: 'St. Ambrose' },
  //   { value: 'Grand View University', display: 'Grand View' },
  // ];
  classYearList = [
    { value: 'Freshman', display: 'Freshmen' },
    { value: 'Sophomore', display: 'Sophomores' },
    { value: 'Junior', display: 'Juniors' },
    { value: 'Senior', display: 'Seniors' },
  ];

  constructor(
    private membersService: MembersService,
    private majorService: MajorService,
    private collegeService: CollegeService
  ) {
    this.userParams = this.membersService.getUserParams();
  }

  ngOnInit(): void {
    // this.resetFilters;
    this.loadCardMembers();
    this.loadCategories();
    this.loadColleges();
  }

  loadCategories() {
    this.majorService.getCategories().subscribe((categories) => {
      this.categories = categories;
      // console.log(this.categories);
    });
  }

  loadColleges() {
    this.collegeService.getColleges().subscribe((colleges) => {
      this.colleges = colleges;
      // console.log(this.categories);
    });
  }

  // loadMajors() {
  //   this.majorService.getMajors().subscribe((majors) => {
  //     this.majors = majors;
  //     console.log(this.majors);
  //   });
  // }

  onSelect(categories) {
    // console.log(categories.target.value);
    this.majorService.getMajors().subscribe((majors) => {
      this.majors = majors;
      // console.log('all majors', majors);
      this.majors = majors.filter(
        (e) => e.categoryId == categories.target.value
      );
      console.log('category id: ', categories.target.value);
      // console.log(
      //   'majors with Category Id of ',
      //   categories.target.value,
      //   ': ',
      //   this.majors
      // );
    });
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
    // this.form.reset(this.form);
    this.value = 'this is a test';
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.membersService.setUserParams(this.userParams);
    this.loadCardMembers();
  }
}
