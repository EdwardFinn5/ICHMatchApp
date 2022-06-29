import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardMember } from 'src/app/_models/cardMember';
import { Category } from 'src/app/_models/category';
import { College } from 'src/app/_models/college';
import { Major } from 'src/app/_models/major';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { CollegeService } from 'src/app/_services/college.service';
import { MajorService } from 'src/app/_services/major.service';
import { MembersService } from 'src/app/_services/members.service';

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

  classYearList = [
    { value: 'Freshman', display: 'Freshmen' },
    { value: 'Sophomore', display: 'Sophomores' },
    { value: 'Junior', display: 'Juniors' },
    { value: 'Senior', display: 'Seniors' },
    { value: 'Post-Undergrad', display: 'Post-Undergrads' },
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

  onSelect(categories) {
    // console.log(categories.target.value);
    this.majorService.getMajors().subscribe((majors) => {
      this.majors = majors;
      // console.log('all majors', majors);
      this.majors = majors.filter(
        (e) => e.categoryId == categories.target.value
      );
      console.log('category id: ', categories.target.value);
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
    this.loadCategories();
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
