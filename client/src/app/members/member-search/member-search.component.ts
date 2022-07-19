import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/_models/category';
import { College } from 'src/app/_models/college';
import { Major } from 'src/app/_models/major';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { Position } from 'src/app/_models/position';
import { UserParams } from 'src/app/_models/userParams';
import { CollegeService } from 'src/app/_services/college.service';
import { MajorService } from 'src/app/_services/major.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
  members: Member[];
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
    private searchMemberService: SearchMembersService,
    private majorService: MajorService,
    private collegeService: CollegeService
  ) {
    this.userParams = this.searchMemberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    this.loadCategories();
    this.loadColleges();
  }

  loadMembers() {
    this.searchMemberService.setUserParams(this.userParams);
    this.searchMemberService
      .getSearchMembers(this.userParams)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
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

  resetFilters() {
    this.userParams = this.searchMemberService.resetUserParams();
    this.loadMembers();
    this.loadCategories();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.searchMemberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
